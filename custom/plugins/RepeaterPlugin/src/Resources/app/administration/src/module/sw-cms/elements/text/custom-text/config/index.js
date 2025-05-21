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
      this.counter++;

      if (!this.element.config.name.value[this.counter]) {
        this.$set(this.element.config.name.value, this.counter, {
          [`name_${this.counter}`]: "",
        });
      }
      if (!this.element.config.link.value[this.counter]) {
        this.$set(this.element.config.link.value, this.counter, {
          [`link_${this.counter}`]: "",
        });
      }

      this.$emit("element-update", this.element);

      this.$nextTick(() => {
        const nameInput = document.getElementById(`name_${this.counter}`);
        const linkInput = document.getElementById(`link_${this.counter}`);
        const deleteButton = document.querySelector(
          `.sw-cms-el-config-text__repeater-item-delete\\[${
            this.counter + 1
          }\\]`
        );

        if (nameInput) {
          nameInput.addEventListener("change", (e) => {
            e.preventDefault();
            this.onInputName(this.counter);
          });
        }

        if (linkInput) {
          linkInput.addEventListener("change", (e) => {
            e.preventDefault();
            this.onInputLink(this.counter);
          });
        }

        if (deleteButton) {
          deleteButton.addEventListener("click", (e) => {
            e.preventDefault();
            this.remove(this.counter);
          });
        }
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
