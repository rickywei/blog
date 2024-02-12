---
description: How to design open api auth
---

# 如何设计API接口（开放平台）鉴权

## 如何确定是谁在请求资源？

AppId：每个开发者都有一个唯一标识，如uuid

## 同一个AppId下如何区分权限（如子账号）？

AppKey：每个AppKey关联不同的权限，如只读

## 为什么需要AppSecret

请求通常将AppId和AppKey明文存放在请求header中，参数被抓包后很容易进行攻击，AppSecret用来签名参数（加密）

## 如何保证参数没有被篡改

对需要校验的参数进行签名
1. 拼接请求method+url
   `GEThttp://api.com`
2. 拼接appiId和appKey
   `GEThttp://api.comxxxyyy`
3. 拼接按字典序排序的所有其他参数
   `GEThttp://api.comxxxyyyk1v1k2v2k3v3`
4. 使用appSecret计算sha256得到签名
   `SHA256(GEThttp://api.comxxxyyyk1v1k2v2k3v3, secret)`

```go
//golang example
func sign(method, url, appId, appKey, appSecret string, args map[string]string) string {
	// 1. 拼接 method + url
	str := method + url

	// 2. 拼接 appId + appKey
	str = str + appId + appKey

	// 3. 拼接所有参数，按参数名字典序排列所有参数和其值
    //    args = query args + form args + body args
	keys := lo.Keys(args)
	sort.Strings(keys)
	for _, k := range keys {
		str += k + args[k]
	}

	// 4. 使用appSecret计算hmac SHA256
    //    也可将appSecret加入参数后计算MD5作为签名
	h := hmac.New(sha256.New, []byte(appSecret))
	_, _ = h.Write([]byte(str))
	return hex.EncodeToString(h.Sum(nil))
}

// 5. 设置签名到请求header X-Signature
```

## 如何防止重放攻击

1. 在参数中添加timestamp并一起签名，服务端验证时需校验timestamp在一定时间范围内，如`timestamp <= now <= timestamp + 60s`
2. 在参数中添加nonce（随机值）并一起签名，服务端验证时需校验该nonce值应该没有被使用过，同时标记一段时间内该nonce不可用，如写入redis `SETEX AppId+AppKey+nonce 60 ""`
3. 仅使用timestamp时，攻击者可在一个范围内重放攻击；仅使用nonce攻击者可以在每隔一段时间重放攻击

## 服务端如何验证参数和签名

1. 验证AppId和AppKey是否合法（存在且配套）
2. 验证appKey对应权限是否满足请求的接口
3. 验证timestamp是否在允许范围内
4. 验证nonce是否未使用
5. 验证签名是否正确（按相同规则重新计算对比是否相同）