<div class="reward-container">
  <div>{{ page.reward_settings.comment }}</div>
  <button disable="enable" onclick="var qr = document.getElementById(&quot;qr&quot;); qr.style.display = (qr.style.display === 'none') ? 'block' : 'none';">
    {{ __('reward.donate') }}
  </button>
  <div id="qr" style="display: none;">

    {%- for name, image in theme.reward %}
      {%- set builtin = ['wechatpay', 'alipay', 'bitcoin'] %}
      {%- if builtin.includes(name) %}
        {%- set translation = __('reward.' + name) %}
      {% else %}
        {%- set translation = name %}
      {%- endif %}
      <div style="display: inline-block;">
      {%- if name === 'PayPal' %}
        <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
        <input type="hidden" name="cmd" value="_donations" />
        <input type="hidden" name="business" value="NMRESXMTDUUR8" />
        <input type="hidden" name="currency_code" value="USD" />
        <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
        <img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
        </form>
      {%- else %}
        <img src="{{ url_for(image) }}" alt="{{ author }} {{ translation }}">
        <p>{{ translation }}</p>
      {%- endif %}
      </div>
    {%- endfor %}

  </div>
</div>
