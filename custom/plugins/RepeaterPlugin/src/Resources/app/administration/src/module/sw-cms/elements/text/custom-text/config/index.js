import template from "./sw-cms-el-config-custom-text.html.twig";
import "./sw-cms-el-config-custom-text.scss";

const { Mixin } = Shopware;

Shopware.Component.register("sw-cms-el-config-custom-text", {
  template,

  compatConfig: Shopware.compatConfig,

  emits: ["element-update"],

  mixins: [Mixin.getByName("cms-element")],

  data() {
    return {
      counter: this.element.config.name.value.length - 1,
    };
  },
  created() {
    this.createdComponent();
  },

  methods: {
    createdComponent() {
      this.initElementConfig("custom-text");
    },
    onInputName(i) {
      console.log("input name - i", i);

      const element = document.getElementById("name_" + i);
      this.emitNameChanges(element.value, i);
    },
    onBlurName(i) {
      console.log("blur name - i", i);

      const element = document.getElementById("name_" + i);
      this.emitNameChanges(element.value, i);
    },
    emitNameChanges(val, i) {
      this.element.config.name.value[i] = { [`name_${i}`]: val };
      this.$emit("element-update", this.element);
    },

    onInputLink(i) {
      const element = document.getElementById("link_" + i);
      this.emitLinkChanges(element.value, i);
    },
    onBlurLink(i) {
      const element = document.getElementById("link_" + i);
      this.emitLinkChanges(element.value, i);
    },
    emitLinkChanges(val, i) {
      this.element.config.link.value[i] = { [`link_${i}`]: val };
      this.$emit("element-update", this.element);
    },
    addRepater() {
      const container = document.querySelector(
        ".sw-cms-el-config-text__repeater-container"
      );

      this.counter++;
      const newItem = document.createElement("fieldset");
      newItem.classList.add(
        "sw-cms-el-config-text__repeater-item",
        "d-flex",
        "align-items-center",
        `element-item[${this.counter}]`
      );

      newItem.innerHTML = `
      <legend>Element ${this.counter + 1}</legend>
      <div class="row w-100">
        <div class="col-md-5">
          <div allow-inline-data-mapping="true" sanitize-info-warn="true" enable-transparent-background="" class="sw-field sw-block-field sw-field--default sw-contextual-field sw-field--text">
            <div class="sw-block-field__block">
              <input allow-inline-data-mapping="true" sanitize-info-warn="true" enable-transparent-background="" id="name_${
                this.counter
              }" type="text"  name="name_${
        this.counter
      }" placeholder="" :value="element.config.name.value[${
        this.counter
      }][name_${this.counter}] ?? ''">
            </div>
          </div>
        </div>
        <div class="col-md-5">
          <div allow-inline-data-mapping="true" sanitize-info-warn="true" enable-transparent-background="" class="sw-field sw-block-field sw-field--default sw-contextual-field sw-field--text">
            <div class="sw-block-field__block">
              <input allow-inline-data-mapping="true" sanitize-info-warn="true" enable-transparent-background="" id="link_${
                this.counter
              }" type="text" name="link_${
        this.counter
      }" placeholder="" :value="element.config.link.value[${
        this.counter
      }][link_${this.counter}]>
            </div>
          </div>
        </div>
        <div class="col-md-2">
          <button class="sw-cms-el-config-text__repeater-item-delete[${
            this.counter + 1
          }] mt-4 sw-button sw-button--danger sw-button--small">
            <span class="sw-button__name">Remove</span>
          </button>
        </div>
      </div>
    `;
      container.insertBefore(newItem, container.lastElementChild);
      document
        .querySelector(
          `.sw-cms-el-config-text__repeater-item-delete\\[${
            this.counter + 1
          }\\]`
        )
        .addEventListener("click", (e) => {
          e.preventDefault();
          this.remove(this.counter);
        });

      document
        .getElementById(`name_${this.counter}`)
        .addEventListener("change", (e) => {
          e.preventDefault();
          this.onInputName(this.counter);
        });
      document
        .getElementById(`link_${this.counter}`)
        .addEventListener("change", (e) => {
          e.preventDefault();
          this.onInputLink(this.counter);
        });
    },
    remove(i) {
      const container = document.querySelector(
        ".sw-cms-el-config-text__repeater-container"
      );
      const item = document.querySelector(`.element-item\\[${i}\\]`);
      container.removeChild(item);
      this.element.config.name.value.splice(i, 1);
      this.element.config.link.value.splice(i, 1);
      this.$emit("element-update", this.element);
      this.counter--;
    },
  },
});
