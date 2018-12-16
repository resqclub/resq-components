A translation helper

Uses the key `id` to dig the translation from the global `window.lang`.

An example of a localized settings view:

```js
<div>
	<h1><Lang id="settings.title" /></h1>
	<p><Lang id="settings.description" /></p>
</div>
```

String interpolation works like this:

```js
<!-- general.hello === 'Greetings %@. How are you feeling today?' -->
<Lang id="general.hello"><b>Professor Falken</b></Lang>
```

If you have two or more arguments, use numbered slots, starting from 0:

```js
<!-- general.xHadALittleY === '%@ had a little %@' -->
<Lang id="general.xHadALittleY">
	<b slot="0" style="color: green">Mary</b>
	<span slot="1" style="text-decoration: underline; color: blue">lamb</span>
</Lang>
```

If you miss a slot, you should get an error:

```js
<div>
	<Lang id="general.hello" />
	<br />
	<Lang id="general.xHadALittleY">
		<span slot="0" style="font-weight: bold">Mary</span>
	</Lang>
</div>
```

If the string id does not exist (or is something else than a string), you get an error:

```js
<div>
	Here's a translation: <Lang id="settings.titel" />. Was that right?
</div>
```
