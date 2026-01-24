@props(['url'])
<tr>
<td class="header">
<a href="{{ $url }}" style="display: inline-block;">
@if (trim($slot) === 'Laravel')
<img src="{{ $url }}/logo-full.png" class="logo" alt="Logo" style="max-width: 100%; width: 400px; height: auto; display: block;">
@else
{!! $slot !!}
@endif
</a>
</td>
</tr>
