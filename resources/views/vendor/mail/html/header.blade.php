@props(['url'])
<tr>
<td class="header">
<a href="{{ $url }}" style="display: inline-block;">
@if (trim($slot) === 'Laravel')
<img src='https://i.postimg.cc/rsRf7590/FrogLogo.png' alt="QTs Montréal" width="75">
@else
{{ $slot }}
@endif
</a>
</td>
</tr>
