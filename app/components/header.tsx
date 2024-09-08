"use client";
import React, { useEffect } from "react";
import { Drawer, Switch } from "antd";
import { CloudOutlined } from "@ant-design/icons";
import IconFont from "@/ui/iconFont";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { changeMode } from "@/redux/modules/themeSlice";
import { changeLang } from "@/redux/modules/langchange";

const loadStyle = (href: string) => {
  const head = document.getElementsByTagName("head")[0];
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  head.appendChild(link);
};

const removeStyle = (href: string) => {
  const links = document.querySelectorAll(
    `link[rel=stylesheet][href*="${href}"]`
  );
  links.forEach((link) => link.parentNode?.removeChild(link));
};

const ThemeComponent = () => {
  const [open, setOpen] = React.useState(false);
  const darkModeState = useSelector((state: RootState) => state.theme.mode);
  const dispatchDarkMode = useDispatch();

  const onClose = () => {
    setOpen(false);
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onchange = (checked: boolean, type: string) => {
    if (checked) {
      if (type === "weak") {
        dispatchDarkMode(changeMode({ mode: "weak", userChoose: true }));
      } else if (type === "gray") {
        dispatchDarkMode(changeMode({ mode: "gray", userChoose: true }));
      } else {
        dispatchDarkMode(changeMode({ mode: "dark", userChoose: true }));
      }
    } else {
      dispatchDarkMode(changeMode({ mode: "light", userChoose: true }));
    }
  };

  useEffect(() => {
    if (darkModeState === "weak") {
      document.getElementById("root")!.style.filter = "invert(100%)";
      removeStyle("styles/theme-default.css");
      removeStyle("styles/theme-dark.css");
    } else if (darkModeState === "gray") {
      document.getElementById("root")!.style.filter = "grayscale(100%)";
      removeStyle("styles/theme-default.css");
      removeStyle("styles/theme-dark.css");
    } else if (darkModeState === "dark") {
      document.getElementById("root")!.style.filter = "none";
      removeStyle("styles/theme-default.css");
      loadStyle("/styles/theme-dark.css");
    } else {
      document.getElementById("root")!.style.filter = "none";
      removeStyle("styles/theme-dark.css");
      loadStyle("/styles/theme-default.css");
    }
  }, [darkModeState]);

  return (
    <span className="ml-2">
      <IconFont name="theme" onClick={showDrawer} />
      <Drawer title="设定" onClose={onClose} open={open}>
        <p className="theme-item">
          暗黑模式
          <Switch
            checked={darkModeState === "dark"}
            checkedChildren="开启"
            unCheckedChildren="关闭"
            onChange={(e) => {
              onchange(e, "dark");
            }}
          ></Switch>
        </p>
        <p className="theme-item">
          色弱模式
          <Switch
            checked={darkModeState === "weak"}
            checkedChildren="开启"
            unCheckedChildren="关闭"
            onChange={(e) => {
              onchange(e, "weak");
            }}
          ></Switch>
        </p>
        <p className="theme-item">
          灰色模式
          <Switch
            checked={darkModeState === "gray"}
            checkedChildren="开启"
            unCheckedChildren="关闭"
            onChange={(e) => {
              onchange(e, "gray");
            }}
          ></Switch>
        </p>
      </Drawer>
    </span>
  );
};

const LanguageComponent: React.FC = () => {
  const lang = useSelector((state: RootState) => state.lang.lang);
  const dispatchLang = useDispatch();

  const handleChange = () => {
    if (lang === "en") {
      dispatchLang(changeLang({ lang: "zh" }));
    } else if (lang === "zh") {
      dispatchLang(changeLang({ lang: "en" }));
    }
  };

  if (lang === "en") {
    return <IconFont name="zhongyingwen1" onClick={handleChange} />;
  } else {
    return <IconFont name="zhongyingwen-2" onClick={handleChange} />;
  }
};

const HeaderBar: React.FC = () => {
  return (
    <header className="h-16 bg-slate-800 px-5 flex justify-between items-center">
      <div className="flex justify-start items-center text-white text-3xl">
        <CloudOutlined />
        <p className="text-[14px] pl-2">默默学开发</p>
      </div>
      <div className="flex">
        <LanguageComponent />
        <ThemeComponent />
      </div>
    </header>
  );
};

export default HeaderBar;
