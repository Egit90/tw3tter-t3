import React from "react";

interface Props {
  Icon: React.ForwardRefExoticComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
      titleId?: string | undefined;
    }
  >;
  Text: string;
}

const SideBarMenuItems = ({ Text, Icon }: Props) => {
  return (
    <div className="hoverEffect flex items-center justify-center space-x-3 text-lg xl:justify-start ">
      <Icon className="h-8" />
      <span className="hidden font-bold xl:inline">{Text}</span>
    </div>
  );
};

export default SideBarMenuItems;
