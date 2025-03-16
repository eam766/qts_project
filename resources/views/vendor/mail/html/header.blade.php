@props(['url'])
<tr>
<td class="header">
<a href="{{ $url }}" style="display: inline-block;">
@if (trim($slot) === 'Laravel')
<img src='https://raw.githubusercontent.com/eam766/qts_project/refs/heads/master/resources/js/assets/img/FrogLogo.png' alt="QTs Montréal" width="75">
@else
{{ $slot }}
@endif
</a>
</td>
</tr>
