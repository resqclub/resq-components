<template>
    <div class="selectBox Select">
        <div v-if="label" class="selectTitle">{{label}}</div>
        <select :disabled="disabled" :value="value" @input="$emit('input', $event.target.value)">
            <option v-for="item of items" :value="item.value">{{item.label}}</option>
        </select>
    </div>
</template>

<script>
	export default {
		name: 'Select',
		/**
         * {
         *      items: [
         *          {
         *              label: 'label',
         *              value: 'value'
         *          }
         *      ],
         * }
		 */
		props: ['label', 'items', 'value', 'disabled']
	}
</script>

<style scoped lang="stylus">
    @import '../common.styl';
    @import '../fonts/brother-1816-mixins.styl';

    .Select {
        brother-medium()
    }
    select {
        box-sizing: border-box;
        width: 150px;
        padding: 5px 30px 5px 10px;
        font-size: 16px;
        border: 1px solid $color-resq-green;;
        background: #f5ffff;
        /* background-image: url(data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3…c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E); */
        outline: none;
        height: 34px;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background-image: linear-gradient(45deg, transparent 50%, #000 50%), linear-gradient(135deg, #000 50%, transparent 50%);
        background-position: calc(100% - 15px) calc(1em - 2px), calc(100% - 10px) calc(1em - 2px), 100% 0;
        background-size: 5px 5px, 5px 5px, 2.5em 2.5em;
        background-repeat: no-repeat;

        &:disabled {
            border: 1px solid #acbfbb;
            background-image: linear-gradient(45deg, transparent 50%, #acbfbb 50%), linear-gradient(135deg, #acbfbb 50%, transparent 50%);
        }
    }
    .selectBox {
        display inline-block
        .selectTitle {
            font-size: $size-s;
        }
    }
</style>
