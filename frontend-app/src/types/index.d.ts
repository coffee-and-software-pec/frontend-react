declare module "*.css"

declare module "*.svg" {
    import {ReactElement, SVGProps} from "react";
    const ReactComponent: (props: SVGProps<SVGElement>) => ReactElement;
    export {ReactComponent}
}

declare module "*.png";
// declare module "*.png" {
// }
// declare module "*.svg" {
//     const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
//     export default content;
// }

declare module "*.json" {
    const value: any;
    export default value;
}