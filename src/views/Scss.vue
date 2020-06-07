<template>
  <div>
    <h3>SCSS Practice</h3>

    <header>变量</header>
    <section>
      <p class="text-01">测试1</p>
      <p class="text-02">测试2</p>
      <p class="text-03">测试3</p>
    </section>

    <header>嵌套</header>
    <section>
      <div class="outer">
        <span>1</span>
        <span>11</span>
        <div>
          <span>2</span>
          <span>22</span>
          <div>
            <span>3</span>
            <span>33</span>
          </div>
        </div>
      </div>
    </section>

    <header>mixin 混入</header>
    <section>
      <p class="mixin-01">mixin测试 01</p>
      <p class="mixin-02">mixin测试 02</p>
    </section>

    <header>extend 继承</header>
    <section>
      <div class="btn-01">button</div>
      <div class="btn-02">button</div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
$color: red;

h3 {
  text-align: center;
}
header {
  font-size: 20px;
  font-weight: bolder;
  border-bottom: 1px dashed #ccc;
  margin: 20px 0px;
  padding-bottom: 10px;
}

.text-01 {
  color: $color;
}
.text-02 {
  $color: blue !global;
  color: $color;
}
.text-03 {
  color: $color;
}
.outer {
  div {
    font-size: 20px;
    display: inline-block;
    margin: 0px 10px;
  }
  span {
    display: inline-block;
    margin: 0px 10px;
  }

  span:nth-child(1) {
    color: red;
  }

  span:nth-child(2) {
    color: green;
  }
}

@mixin font {
  font-size: 30px;
  color: $color;
  font-weight: bolder;
}
@mixin back($color: #ccc) {
  background-color: $color;
}
.mixin-01 {
  @include font;
  @include back;
}
.mixin-02 {
  @include font;
  @include back(rgba(255, 0, 0, 0.1));
}

.btn {
  display: inline-block;
  margin: 5px 10px;
  border: 1px solid #e8e8e8;
  font-size: 16px;
  height: 22px;
  line-height: 22px;
  padding: 5px;
}

.btn-01 {
  @extend .btn;
  color: blue;
}
.btn-02 {
  @extend .btn;
  @include back(rgba(255, 0, 0, 0.1));
  color: white;
}
</style>
