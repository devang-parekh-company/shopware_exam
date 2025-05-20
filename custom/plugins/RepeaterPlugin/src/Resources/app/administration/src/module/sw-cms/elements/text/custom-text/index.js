import "./preview";
import "./config";
import "./component";

Shopware.Service("cmsService").registerCmsElement({
  name: "custom-text",
  label: "custom text",
  component: "sw-cms-el-custom-text",
  configComponent: "sw-cms-el-config-custom-text",
  previewComponent: "sw-cms-el-preview-custom-text",
  defaultConfig: {
    name: {
      source: "static",
      value: [{ name_0: "custom test 1" }],
    },
    link: {
      source: "static",
      value: [{ link_0: "custom text 1 link" }],
    },
  },
});
