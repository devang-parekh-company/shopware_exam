import template from "./sw-cms-el-custom-text.html.twig";
import "./sw-cms-el-custom-text.scss";

const { Mixin } = Shopware;
Shopware.Component.register("sw-cms-el-custom-text", {
  template,

  compatConfig: Shopware.compatConfig,

  emits: ["element-update"],

  mixins: [Mixin.getByName("cms-element")],

  created() {
    this.createdComponent();
  },

  methods: {
    createdComponent() {
      this.initElementConfig("custom-text");
    },
  },
});
