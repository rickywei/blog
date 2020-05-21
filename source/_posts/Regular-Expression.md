---
title: Regular Expression
date: 2020-03-16 21:21:40
update:
tags: [Linux, Regular Expression]
categories: Linux
description: Now you have two problems
---

<h2>Character Escapes</h2>
<p>The backslash character (\) in a regular expression indicates that the character that follows it either is a special character (as shown in the following table), or should be interpreted literally. For more information.</p>
<div class="table-scroll-wrapper"><table class="table"><caption class="visually-hidden">Table 1</caption>
<thead>
<tr>
<th>Escaped character</th>
<th>Description</th>
<th>Pattern</th>
<th>Matches</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>\a</code></td>
<td>Matches a bell character, \u0007.</td>
<td><code>\a</code></td>
<td><code>"\u0007"</code> in <code>"Error!" + '\u0007'</code></td>
</tr>
<tr>
<td><code>\b</code></td>
<td>In a character class, matches a backspace, \u0008.</td>
<td><code>[\b]{3,}</code></td>
<td><code>"\b\b\b\b"</code> in <code>"\b\b\b\b"</code></td>
</tr>
<tr>
<td><code>\t</code></td>
<td>Matches a tab, \u0009.</td>
<td><code>(\w+)\t</code></td>
<td><code>"item1\t"</code>, <code>"item2\t"</code> in <code>"item1\titem2\t"</code></td>
</tr>
<tr>
<td><code>\r</code></td>
<td>Matches a carriage return, \u000D. (<code>\r</code> is not equivalent to the newline character, <code>\n</code>.)</td>
<td><code>\r\n(\w+)</code></td>
<td><code>"\r\nThese"</code> in <code>"\r\nThese are\ntwo lines."</code></td>
</tr>
<tr>
<td><code>\v</code></td>
<td>Matches a vertical tab, \u000B.</td>
<td><code>[\v]{2,}</code></td>
<td><code>"\v\v\v"</code> in <code>"\v\v\v"</code></td>
</tr>
<tr>
<td><code>\f</code></td>
<td>Matches a form feed, \u000C.</td>
<td><code>[\f]{2,}</code></td>
<td><code>"\f\f\f"</code> in <code>"\f\f\f"</code></td>
</tr>
<tr>
<td><code>\n</code></td>
<td>Matches a new line, \u000A.</td>
<td><code>\r\n(\w+)</code></td>
<td><code>"\r\nThese"</code> in <code>"\r\nThese are\ntwo lines."</code></td>
</tr>
<tr>
<td><code>\e</code></td>
<td>Matches an escape, \u001B.</td>
<td><code>\e</code></td>
<td><code>"\x001B"</code> in <code>"\x001B"</code></td>
</tr>
<tr>
<td><code>\</code> <em>nnn</em></td>
<td>Uses octal representation to specify a character (<em>nnn</em> consists of two or three digits).</td>
<td><code>\w\040\w</code></td>
<td><code>"a b"</code>, <code>"c d"</code> in <code>"a bc d"</code></td>
</tr>
<tr>
<td><code>\x</code> <em>nn</em></td>
<td>Uses hexadecimal representation to specify a character (<em>nn</em> consists of exactly two digits).</td>
<td><code>\w\x20\w</code></td>
<td><code>"a b"</code>, <code>"c d"</code> in <code>"a bc d"</code></td>
</tr>
<tr>
<td><code>\c</code> <em>X</em><br><br> <code>\c</code> <em>x</em></td>
<td>Matches the ASCII control character that is specified by <em>X</em> or <em>x</em>, where <em>X</em> or <em>x</em> is the letter of the control character.</td>
<td><code>\cC</code></td>
<td><code>"\x0003"</code> in <code>"\x0003"</code> (Ctrl-C)</td>
</tr>
<tr>
<td><code>\u</code> <em>nnnn</em></td>
<td>Matches a Unicode character by using hexadecimal representation (exactly four digits, as represented by <em>nnnn</em>).</td>
<td><code>\w\u0020\w</code></td>
<td><code>"a b"</code>, <code>"c d"</code> in <code>"a bc d"</code></td>
</tr>
<tr>
<td><code>\</code></td>
<td>When followed by a character that is not recognized as an escaped character in this and other tables in this topic, matches that character. For example, <code>\*</code> is the same as <code>\x2A</code>, and <code>\.</code> is the same as <code>\x2E</code>. This allows the regular expression engine to disambiguate language elements (such as * or ?) and character literals (represented by <code>\*</code> or <code>\?</code>).</td>
<td><code>\d+[\+-x\*]\d+</code></td>
<td><code>"2+2"</code> and <code>"3*9"</code> in <code>"(2+2) * 3*9"</code></td>
</tr>
</tbody>
</table></div>
<h2 id="character-classes">Character Classes</h2>
<p>A character class matches any one of a set of characters. Character classes include the language elements listed in the following table. For more information, .</p>
<div class="table-scroll-wrapper"><table class="table"><caption class="visually-hidden">Table 2</caption>
<thead>
<tr>
<th>Character class</th>
<th>Description</th>
<th>Pattern</th>
<th>Matches</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>[</code> <em>character_group</em> <code>]</code></td>
<td>Matches any single character in <em>character_group</em>. By default, the match is case-sensitive.</td>
<td><code>[ae]</code></td>
<td><code>"a"</code> in <code>"gray"</code><br><br> <code>"a"</code>, <code>"e"</code> in <code>"lane"</code></td>
</tr>
<tr>
<td><code>[^</code> <em>character_group</em> <code>]</code></td>
<td>Negation: Matches any single character that is not in <em>character_group</em>. By default, characters in <em>character_group</em> are case-sensitive.</td>
<td><code>[^aei]</code></td>
<td><code>"r"</code>, <code>"g"</code>, <code>"n"</code> in <code>"reign"</code></td>
</tr>
<tr>
<td><code>[</code> <em>first</em> <code>-</code> <em>last</em> <code>]</code></td>
<td>Character range: Matches any single character in the range from <em>first</em> to <em>last</em>.</td>
<td><code>[A-Z]</code></td>
<td><code>"A"</code>, <code>"B"</code> in <code>"AB123"</code></td>
</tr>
<tr>
<td><code>.</code></td>
<td>Wildcard: Matches any single character except \n.<br><br> To match a literal period character (. or <code>\u002E</code>), you must precede it with the escape character (<code>\.</code>).</td>
<td><code>a.e</code></td>
<td><code>"ave"</code> in <code>"nave"</code><br><br> <code>"ate"</code> in <code>"water"</code></td>
</tr>
<tr>
<td><code>\p{</code> <em>name</em> <code>}</code></td>
<td>Matches any single character in the Unicode general category or named block specified by <em>name</em>.</td>
<td><code>\p{Lu}</code><br><br> <code>\p{IsCyrillic}</code></td>
<td><code>"C"</code>, <code>"L"</code> in <code>"City Lights"</code><br><br> <code>"Д"</code>, <code>"Ж"</code> in <code>"ДЖem"</code></td>
</tr>
<tr>
<td><code>\P{</code> <em>name</em> <code>}</code></td>
<td>Matches any single character that is not in the Unicode general category or named block specified by <em>name</em>.</td>
<td><code>\P{Lu}</code><br><br> <code>\P{IsCyrillic}</code></td>
<td><code>"i"</code>, <code>"t"</code>, <code>"y"</code> in <code>"City"</code><br><br> <code>"e"</code>, <code>"m"</code> in <code>"ДЖem"</code></td>
</tr>
<tr>
<td><code>\w</code></td>
<td>Matches any word character.</td>
<td><code>\w</code></td>
<td><code>"I"</code>, <code>"D"</code>, <code>"A"</code>, <code>"1"</code>, <code>"3"</code> in <code>"ID A1.3"</code></td>
</tr>
<tr>
<td><code>\W</code></td>
<td>Matches any non-word character.</td>
<td><code>\W</code></td>
<td><code>" "</code>, <code>"."</code> in <code>"ID A1.3"</code></td>
</tr>
<tr>
<td><code>\s</code></td>
<td>Matches any white-space character.</td>
<td><code>\w\s</code></td>
<td><code>"D "</code> in <code>"ID A1.3"</code></td>
</tr>
<tr>
<td><code>\S</code></td>
<td>Matches any non-white-space character.</td>
<td><code>\s\S</code></td>
<td><code>" _"</code> in <code>"int __ctr"</code></td>
</tr>
<tr>
<td><code>\d</code></td>
<td>Matches any decimal digit.</td>
<td><code>\d</code></td>
<td><code>"4"</code> in <code>"4 = IV"</code></td>
</tr>
<tr>
<td><code>\D</code></td>
<td>Matches any character other than a decimal digit.</td>
<td><code>\D</code></td>
<td><code>" "</code>, <code>"="</code>, <code>" "</code>, <code>"I"</code>, <code>"V"</code> in <code>"4 = IV"</code></td>
</tr>
</tbody>
</table></div>
<h2 id="anchors">Anchors</h2>
<p>Anchors, or atomic zero-width assertions, cause a match to succeed or fail depending on the current position in the string, but they do not cause the engine to advance through the string or consume characters. The metacharacters listed in the following table are anchors. For more information, .</p>
<div class="table-scroll-wrapper"><table class="table"><caption class="visually-hidden">Table 3</caption>
<thead>
<tr>
<th>Assertion</th>
<th>Description</th>
<th>Pattern</th>
<th>Matches</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>^</code></td>
<td>By default, the match must start at the beginning of the string; in multiline mode, it must start at the beginning of the line.</td>
<td><code>^\d{3}</code></td>
<td><code>"901"</code> in <code>"901-333-"</code></td>
</tr>
<tr>
<td><code>$</code></td>
<td>By default, the match must occur at the end of the string or before <code>\n</code> at the end of the string; in multiline mode, it must occur before the end of the line or before <code>\n</code> at the end of the line.</td>
<td><code>-\d{3}$</code></td>
<td><code>"-333"</code> in <code>"-901-333"</code></td>
</tr>
<tr>
<td><code>\A</code></td>
<td>The match must occur at the start of the string.</td>
<td><code>\A\d{3}</code></td>
<td><code>"901"</code> in <code>"901-333-"</code></td>
</tr>
<tr>
<td><code>\Z</code></td>
<td>The match must occur at the end of the string or before <code>\n</code> at the end of the string.</td>
<td><code>-\d{3}\Z</code></td>
<td><code>"-333"</code> in <code>"-901-333"</code></td>
</tr>
<tr>
<td><code>\z</code></td>
<td>The match must occur at the end of the string.</td>
<td><code>-\d{3}\z</code></td>
<td><code>"-333"</code> in <code>"-901-333"</code></td>
</tr>
<tr>
<td><code>\G</code></td>
<td>The match must occur at the point where the previous match ended.</td>
<td><code>\G\(\d\)</code></td>
<td><code>"(1)"</code>, <code>"(3)"</code>, <code>"(5)"</code> in <code>"(1)(3)(5)[7](9)"</code></td>
</tr>
<tr>
<td><code>\b</code></td>
<td>The match must occur on a boundary between a <code>\w</code> (alphanumeric) and a <code>\W</code> (nonalphanumeric) character.</td>
<td><code>\b\w+\s\w+\b</code></td>
<td><code>"them theme"</code>, <code>"them them"</code> in <code>"them theme them them"</code></td>
</tr>
<tr>
<td><code>\B</code></td>
<td>The match must not occur on a <code>\b</code> boundary.</td>
<td><code>\Bend\w*\b</code></td>
<td><code>"ends"</code>, <code>"ender"</code> in <code>"end sends endure lender"</code></td>
</tr>
</tbody>
</table></div>
<h2 id="grouping-constructs">Grouping Constructs</h2>
<p>Grouping constructs delineate subexpressions of a regular expression and typically capture substrings of an input string. Grouping constructs include the language elements listed in the following table. For more information, .</p>
<div class="table-scroll-wrapper"><table class="table"><caption class="visually-hidden">Table 4</caption>
<thead>
<tr>
<th>Grouping construct</th>
<th>Description</th>
<th>Pattern</th>
<th>Matches</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>(</code> <em>subexpression</em> <code>)</code></td>
<td>Captures the matched subexpression and assigns it a one-based ordinal number.</td>
<td><code>(\w)\1</code></td>
<td><code>"ee"</code> in <code>"deep"</code></td>
</tr>
<tr>
<td><code>(?&lt;</code> <em>name</em> <code>&gt;</code> <em>subexpression</em> <code>)</code></td>
<td>Captures the matched subexpression into a named group.</td>
<td><code>(?&lt;double&gt;\w)\k&lt;double&gt;</code></td>
<td><code>"ee"</code> in <code>"deep"</code></td>
</tr>
<tr>
<td><code>(?&lt;</code> <em>name1</em> <code>-</code> <em>name2</em> <code>&gt;</code> <em>subexpression</em> <code>)</code></td>
<td>Defines a balancing group definition. For more information, see the "Balancing Group Definition" section in 
<td><code>(((?'Open'\()[^\(\)]*)+((?'Close-Open'\))[^\(\)]*)+)*(?(Open)(?!))$</code></td>
<td><code>"((1-3)*(3-1))"</code> in <code>"3+2^((1-3)*(3-1))"</code></td>
</tr>
<tr>
<td><code>(?:</code> <em>subexpression</em> <code>)</code></td>
<td>Defines a noncapturing group.</td>
<td><code>Write(?:Line)?</code></td>
<td><code>"WriteLine"</code> in <code>"Console.WriteLine()"</code><br><br> <code>"Write"</code> in <code>"Console.Write(value)"</code></td>
</tr>
<tr>
<td><code>(?imnsx-imnsx:</code> <em>subexpression</em> <code>)</code></td>
<td>Applies or disables the specified options within <em>subexpression</em>. For more information, .</td>
<td><code>A\d{2}(?i:\w+)\b</code></td>
<td><code>"A12xl"</code>, <code>"A12XL"</code> in <code>"A12xl A12XL a12xl"</code></td>
</tr>
<tr>
<td><code>(?=</code> <em>subexpression</em> <code>)</code></td>
<td>Zero-width positive lookahead assertion.</td>
<td><code>\w+(?=\.)</code></td>
<td><code>"is"</code>, <code>"ran"</code>, and <code>"out"</code> in <code>"He is. The dog ran. The sun is out."</code></td>
</tr>
<tr>
<td><code>(?!</code> <em>subexpression</em> <code>)</code></td>
<td>Zero-width negative lookahead assertion.</td>
<td><code>\b(?!un)\w+\b</code></td>
<td><code>"sure"</code>, <code>"used"</code> in <code>"unsure sure unity used"</code></td>
</tr>
<tr>
<td><code>(?&lt;=</code> <em>subexpression</em> <code>)</code></td>
<td>Zero-width positive lookbehind assertion.</td>
<td><code>(?&lt;=19)\d{2}\b</code></td>
<td><code>"99"</code>, <code>"50"</code>, <code>"05"</code> in <code>"1851 1999 1950 1905 2003"</code></td>
</tr>
<tr>
<td><code>(?&lt;!</code> <em>subexpression</em> <code>)</code></td>
<td>Zero-width negative lookbehind assertion.</td>
<td><code>(?&lt;!19)\d{2}\b</code></td>
<td><code>"51"</code>, <code>"03"</code> in <code>"1851 1999 1950 1905 2003"</code></td>
</tr>
<tr>
<td><code>(?&gt;</code> <em>subexpression</em> <code>)</code></td>
<td>Atomic group.</td>
<td><code>[13579](?&gt;A+B+)</code></td>
<td><code>"1ABB"</code>, <code>"3ABB"</code>, and <code>"5AB"</code> in <code>"1ABB 3ABBC 5AB 5AC"</code></td>
</tr>
</tbody>
</table></div>
<h2 id="quantifiers">Quantifiers</h2>
<p>A quantifier specifies how many instances of the previous element (which can be a character, a group, or a character class) must be present in the input string for a match to occur. Quantifiers include the language elements listed in the following table. For more information, .</p>
<div class="table-scroll-wrapper"><table class="table"><caption class="visually-hidden">Table 5</caption>
<thead>
<tr>
<th>Quantifier</th>
<th>Description</th>
<th>Pattern</th>
<th>Matches</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>*</code></td>
<td>Matches the previous element zero or more times.</td>
<td><code>\d*\.\d</code></td>
<td><code>".0"</code>, <code>"19.9"</code>, <code>"219.9"</code></td>
</tr>
<tr>
<td><code>+</code></td>
<td>Matches the previous element one or more times.</td>
<td><code>"be+"</code></td>
<td><code>"bee"</code> in <code>"been"</code>, <code>"be"</code> in <code>"bent"</code></td>
</tr>
<tr>
<td><code>?</code></td>
<td>Matches the previous element zero or one time.</td>
<td><code>"rai?n"</code></td>
<td><code>"ran"</code>, <code>"rain"</code></td>
</tr>
<tr>
<td><code>{</code> <em>n</em> <code>}</code></td>
<td>Matches the previous element exactly <em>n</em> times.</td>
<td><code>",\d{3}"</code></td>
<td><code>",043"</code> in <code>"1,043.6"</code>, <code>",876"</code>, <code>",543"</code>, and <code>",210"</code> in <code>"9,876,543,210"</code></td>
</tr>
<tr>
<td><code>{</code> <em>n</em> <code>,}</code></td>
<td>Matches the previous element at least <em>n</em> times.</td>
<td><code>"\d{2,}"</code></td>
<td><code>"166"</code>, <code>"29"</code>, <code>"1930"</code></td>
</tr>
<tr>
<td><code>{</code> <em>n</em> <code>,</code> <em>m</em> <code>}</code></td>
<td>Matches the previous element at least <em>n</em> times, but no more than <em>m</em> times.</td>
<td><code>"\d{3,5}"</code></td>
<td><code>"166"</code>, <code>"17668"</code><br><br> <code>"19302"</code> in <code>"193024"</code></td>
</tr>
<tr>
<td><code>*?</code></td>
<td>Matches the previous element zero or more times, but as few times as possible.</td>
<td><code>\d*?\.\d</code></td>
<td><code>".0"</code>, <code>"19.9"</code>, <code>"219.9"</code></td>
</tr>
<tr>
<td><code>+?</code></td>
<td>Matches the previous element one or more times, but as few times as possible.</td>
<td><code>"be+?"</code></td>
<td><code>"be"</code> in <code>"been"</code>, <code>"be"</code> in <code>"bent"</code></td>
</tr>
<tr>
<td><code>??</code></td>
<td>Matches the previous element zero or one time, but as few times as possible.</td>
<td><code>"rai??n"</code></td>
<td><code>"ran"</code>, <code>"rain"</code></td>
</tr>
<tr>
<td><code>{</code> <em>n</em> <code>}?</code></td>
<td>Matches the preceding element exactly <em>n</em> times.</td>
<td><code>",\d{3}?"</code></td>
<td><code>",043"</code> in <code>"1,043.6"</code>, <code>",876"</code>, <code>",543"</code>, and <code>",210"</code> in <code>"9,876,543,210"</code></td>
</tr>
<tr>
<td><code>{</code> <em>n</em> <code>,}?</code></td>
<td>Matches the previous element at least <em>n</em> times, but as few times as possible.</td>
<td><code>"\d{2,}?"</code></td>
<td><code>"166"</code>, <code>"29"</code>, <code>"1930"</code></td>
</tr>
<tr>
<td><code>{</code> <em>n</em> <code>,</code> <em>m</em> <code>}?</code></td>
<td>Matches the previous element between <em>n</em> and <em>m</em> times, but as few times as possible.</td>
<td><code>"\d{3,5}?"</code></td>
<td><code>"166"</code>, <code>"17668"</code><br><br> <code>"193"</code>, <code>"024"</code> in <code>"193024"</code></td>
</tr>
</tbody>
</table></div>
<h2 id="backreference-constructs">Backreference Constructs</h2>
<p>A backreference allows a previously matched subexpression to be identified subsequently in the same regular expression. The following table lists the backreference constructs supported by regular expressions in .NET. For more information, .</p>
<div class="table-scroll-wrapper"><table class="table"><caption class="visually-hidden">Table 6</caption>
<thead>
<tr>
<th>Backreference construct</th>
<th>Description</th>
<th>Pattern</th>
<th>Matches</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>\</code> <em>number</em></td>
<td>Backreference. Matches the value of a numbered subexpression.</td>
<td><code>(\w)\1</code></td>
<td><code>"ee"</code> in <code>"seek"</code></td>
</tr>
<tr>
<td><code>\k&lt;</code> <em>name</em> <code>&gt;</code></td>
<td>Named backreference. Matches the value of a named expression.</td>
<td><code>(?&lt;char&gt;\w)\k&lt;char&gt;</code></td>
<td><code>"ee"</code> in <code>"seek"</code></td>
</tr>
</tbody>
</table></div>
<h2 id="alternation-constructs">Alternation Constructs</h2>
<p>Alternation constructs modify a regular expression to enable either/or matching. These constructs include the language elements listed in the following table. For more information, .</p>
<div class="table-scroll-wrapper"><table class="table"><caption class="visually-hidden">Table 7</caption>
<thead>
<tr>
<th>Alternation construct</th>
<th>Description</th>
<th>Pattern</th>
<th>Matches</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>|</code></td>
<td>Matches any one element separated by the vertical bar (<code>|</code>) character.</td>
<td><code>th(e|is|at)</code></td>
<td><code>"the"</code>, <code>"this"</code> in <code>"this is the day."</code></td>
</tr>
<tr>
<td><code>(?(</code> <em>expression</em> <code>)</code> <em>yes</em> <code>|</code> <em>no</em> <code>)</code></td>
<td>Matches <em>yes</em> if the regular expression pattern designated by <em>expression</em> matches; otherwise, matches the optional <em>no</em> part. <em>expression</em> is interpreted as a zero-width assertion.</td>
<td><code>(?(A)A\d{2}\b|\b\d{3}\b)</code></td>
<td><code>"A10"</code>, <code>"910"</code> in <code>"A10 C103 910"</code></td>
</tr>
<tr>
<td><code>(?(</code> <em>name</em> <code>)</code> <em>yes</em> <code>|</code> <em>no</em> <code>)</code></td>
<td>Matches <em>yes</em> if <em>name</em>, a named or numbered capturing group, has a match; otherwise, matches the optional <em>no</em>.</td>
<td><code>(?&lt;quoted&gt;")?(?(quoted).+?"|\S+\s)</code></td>
<td><code>"Dogs.jpg "</code>, <code>"\"Yiska playing.jpg\""</code> in <code>"Dogs.jpg \"Yiska playing.jpg\""</code></td>
</tr>
</tbody>
</table></div>
<h2 id="substitutions">Substitutions</h2>
<p>Substitutions are regular expression language elements that are supported in replacement patterns. For more information, . The metacharacters listed in the following table are atomic zero-width assertions.</p>
<div class="table-scroll-wrapper"><table class="table"><caption class="visually-hidden">Table 8</caption>
<thead>
<tr>
<th>Character</th>
<th>Description</th>
<th>Pattern</th>
<th>Replacement pattern</th>
<th>Input string</th>
<th>Result string</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>$</code> <em>number</em></td>
<td>Substitutes the substring matched by group <em>number</em>.</td>
<td><code>\b(\w+)(\s)(\w+)\b</code></td>
<td><code>$3$2$1</code></td>
<td><code>"one two"</code></td>
<td><code>"two one"</code></td>
</tr>
<tr>
<td><code>${</code> <em>name</em> <code>}</code></td>
<td>Substitutes the substring matched by the named group <em>name</em>.</td>
<td><code>\b(?&lt;word1&gt;\w+)(\s)(?&lt;word2&gt;\w+)\b</code></td>
<td><code>${word2} ${word1}</code></td>
<td><code>"one two"</code></td>
<td><code>"two one"</code></td>
</tr>
<tr>
<td><code>$$</code></td>
<td>Substitutes a literal "$".</td>
<td><code>\b(\d+)\s?USD</code></td>
<td><code>$$$1</code></td>
<td><code>"103 USD"</code></td>
<td><code>"$103"</code></td>
</tr>
<tr>
<td><code>$&amp;</code></td>
<td>Substitutes a copy of the whole match.</td>
<td><code>\$?\d*\.?\d+</code></td>
<td><code>**$&amp;**</code></td>
<td><code>"$1.30"</code></td>
<td><code>"**$1.30**"</code></td>
</tr>
<tr>
<td><code>$`</code></td>
<td>Substitutes all the text of the input string before the match.</td>
<td><code>B+</code></td>
<td><code>$`</code></td>
<td><code>"AABBCC"</code></td>
<td><code>"AAAACC"</code></td>
</tr>
<tr>
<td><code>$'</code></td>
<td>Substitutes all the text of the input string after the match.</td>
<td><code>B+</code></td>
<td><code>$'</code></td>
<td><code>"AABBCC"</code></td>
<td><code>"AACCCC"</code></td>
</tr>
<tr>
<td><code>$+</code></td>
<td>Substitutes the last group that was captured.</td>
<td><code>B+(C+)</code></td>
<td><code>$+</code></td>
<td><code>"AABBCCDD"</code></td>
<td><code>"AACCDD"</code></td>
</tr>
<tr>
<td><code>$_</code></td>
<td>Substitutes the entire input string.</td>
<td><code>B+</code></td>
<td><code>$_</code></td>
<td><code>"AABBCC"</code></td>
<td><code>"AAAABBCCCC"</code></td>
</tr>
</tbody>
</table></div>
<h2 id="regular-expression-options">Regular Expression Options</h2>
<p>You can specify options that control how the regular expression engine interprets a regular expression pattern. Many of these options can be specified either inline (in the regular expression pattern) or as one or more 
<p>You can specify an inline option in two ways:</p>
<ul>
<li>By using the miscellaneous construct (?imnsx-imnsx), where a minus sign (-) before an option or set of options turns those options off. For example, (?i-mn) turns case-insensitive matching (i) on, turns multiline mode (m) off, and turns unnamed group captures (n) off. The option applies to the regular expression pattern from the point at which the option is defined, and is effective either to the end of the pattern or to the point where another construct reverses the option.
<li>By using the grouping construct(?imnsx-imnsx:subexpression), which defines options for the specified group only.
</ul>
<div class="table-scroll-wrapper"><table class="table"><caption class="visually-hidden">Table 9</caption>
<thead>
<tr>
<th>Option</th>
<th>Description</th>
<th>Pattern</th>
<th>Matches</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>i</code></td>
<td>Use case-insensitive matching.</td>
<td><code>\b(?i)a(?-i)a\w+\b</code></td>
<td><code>"aardvark"</code>, <code>"aaaAuto"</code> in <code>"aardvark AAAuto aaaAuto Adam breakfast"</code></td>
</tr>
<tr>
<td><code>m</code></td>
<td>Use multiline mode. <code>^</code> and <code>$</code> match the beginning and end of a line, instead of the beginning and end of a string.</td>
<td>For an example, see the "Multiline Mode" section in 
<td aria-label="No value"></td>
</tr>
<tr>
<td><code>n</code></td>
<td>Do not capture unnamed groups.</td>
<td>For an example, see the "Explicit Captures Only" section in 
<td aria-label="No value"></td>
</tr>
<tr>
<td><code>s</code></td>
<td>Use single-line mode.</td>
<td>For an example, see the "Single-line Mode" section in 
<td aria-label="No value"></td>
</tr>
<tr>
<td><code>x</code></td>
<td>Ignore unescaped white space in the regular expression pattern.</td>
<td><code>\b(?x) \d+ \s \w+</code></td>
<td><code>"1 aardvark"</code>, <code>"2 cats"</code> in <code>"1 aardvark 2 cats IV centurions"</code></td>
</tr>
</tbody>
</table></div>
<h2 id="miscellaneous-constructs">Miscellaneous Constructs</h2>
<p>Miscellaneous constructs either modify a regular expression pattern or provide information about it. The following table lists the miscellaneous constructs supported by .NET. For more information, .</p>
<div class="table-scroll-wrapper"><table class="table"><caption class="visually-hidden">Table 10</caption>
<thead>
<tr>
<th>Construct</th>
<th>Definition</th>
<th>Example</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>(?imnsx-imnsx)</code></td>
<td>Sets or disables options such as case insensitivity in the middle of a pattern.For more information, .</td>
<td><code>\bA(?i)b\w+\b</code> matches <code>"ABA"</code>, <code>"Able"</code> in <code>"ABA Able Act"</code></td>
</tr>
<tr>
<td><code>(?#</code> <em>comment</em> <code>)</code></td>
<td>Inline comment. The comment ends at the first closing parenthesis.</td>
<td><code>\bA(?#Matches words starting with A)\w+\b</code></td>
</tr>
<tr>
<td><code>#</code> [to end of line]</td>
<td>X-mode comment. The comment starts at an unescaped <code>#</code> and continues to the end of the line.</td>
<td><code>(?x)\bA\w+\b#Matches words starting with A</code></td>
</tr>
</tbody>
</table></div>
