<template>
    <div class="ip-input-box">
        <div v-for="(item, index) in inputList" :key="index">
            <input class="item-input" type="text" v-model="item.value" @keydown="keydownEvent($event, index)" @input="inputEvent($event, index)" />
        </div>
    </div>
</template>
<script>
export default {
    name: 'ComIpInput',
    model: {
        prop: 'value',
        event: 'input',
    },
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            allEls: [],
            inputList: [{ value: '' }, { value: '' }, { value: '' }, { value: '' }]
        }
    },
    created() {
        let value = this.value.replace(/[^0-9\.]/g, '');
        let arr = value.split('.') || [];
        this.inputList.forEach((item, index) => {
            item.value = arr[index] || '';
        })
    },
    mounted() {
        this.allEls = this.$el.getElementsByClassName('item-input');
    },
    methods: {
        keydownEvent(event, index) {
            let keyCode = event.keyCode;
            // 输入.时，移动到下一个元素
            if (keyCode === 110 && index !== 3) {
                this.allEls[index + 1].focus();
                return;
            }

            // 输入Backspace时
            if (keyCode === 8) {
                if (this.inputList[index].value.length > 0) {
                    this.inputList[index].value = '';

                    this.inputEvent(null, index)
                } else if (index !== 0) {
                    this.allEls[index - 1].focus();
                    this.inputList[index - 1].value = '';

                    this.inputEvent(null, index -1)
                }

                return;
            }

            let value = this.inputList[index].value;
            if (this.length < 3) {
                return;
            }

            if (index === 3) {
                this.allEls[index].blur();
            } else {
                this.allEls[index + 1].focus();
                this.allEls[index + 1].select();
            }
        },
        inputEvent(event, index) {
            this.inputList[index].value = this.inputList[index].value.replace(/\.|[^0-9]/g, '');

            this.$emit('input', this.inputList.reduce((pre, next) => {
                pre.push(next.value || '');
                return pre;
            }, []).join('.'))
        }
    },
    watch: {
        value: {
            immidate: true,
            handler: function() {
                let tmp = this.value.split('.');
                let len = tmp.length;
                while (len++ < 4) {
                    tmp.push('')
                }

                this.pValues = tmp;
            }
        }
    }
}
</script>