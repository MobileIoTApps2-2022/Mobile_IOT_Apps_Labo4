declare module 'chartist' {

namespace Chartist {

  interface ChartistStatic {

    precision: number;

    escapingMap: IChartistEscapeMap;

    Pie: IChartistPieChart;
    Bar: IChartistBarChart;
    Line: IChartistLineChart;

    FixedScaleAxis: IFixedScaleAxisStatic;
    AutoScaleAxis: IAutoScaleAxisStatic;
    StepAxis: IStepAxisStatic;

    Svg: ChartistSvgStatic;
    Interpolation: ChartistInterpolationStatic;

    noop: Function;

    alphaNumerate(n: number): string;
    extend(target: Object, ...sources: Object[]): Object;

    replaceAll(str: string, subStr: string, newSubStr: string): string;
    ensureUnit(value: number, unit: string): string;
    quantity(input: string | number): Object;

    query(query: Node | string): Node;
    times(length: number): Array<any>;
    sum(previous: number, current: number): number;
    mapMultiply(factor: number): (num: number) => number;
    mapAdd(addend: number): (num: number) => number;
    serialMap(arr: Array<any>, cb: Function): Array<any>;
    roundWithPrecision(value: number, digits?: number): number;

    getMultiValue(value: any, dimension?: any): number;

    serialize(data: Object | string | number): string;
    deserialize(data: string): Object | string | number;

    createSvg(container: Node, width: string, height: string, className: string): Object;

    plugins: any;
  }

  interface IChartistEscapeMap {
    [Key: string]: string;
  }

  interface IResponsiveOptionTuple<T extends IChartOptions> extends Array<string | T> {
    0: string;
    1: T;
  }

  interface IFixedScaleAxisStatic { }
  interface IAutoScaleAxisStatic { }
  interface IStepAxisStatic { }

  interface IChartistData {
    labels?: Array<string> | Array<number> | Array<Date>;
    series: Array<IChartistSeriesData> | Array<number> |  Array<Array<number>>;
  }

  interface IChartistSeriesData {
    name?: string;
    value?: number;
    data?: Array<number>;
    className?: string;
    meta?: string;
  }

  interface IChartistBase<T extends IChartOptions> {
    container: any;
    data: IChartistData;
    defaultOptions: T;
    options: T;
    responsiveOptions: Array<IResponsiveOptionTuple<T>>;

    eventEmitter: any;

    supportsForeignObject: boolean;
    supportsAnimations: boolean;
    resizeListener: any;

    plugins?: Array<any>;

    update(data: Object, options?: T, override?: boolean): void;
    detach(): void;

    on(event: string, handler: Function): IChartistBase<T>;

    off(event: string, handler?: Function): IChartistBase<T>;
  }

  interface IChartistPieChart extends IChartistBase<IPieChartOptions> {
    new (target: any, data: IChartistData, options?: IPieChartOptions, responsiveOptions?: Array<IResponsiveOptionTuple<IPieChartOptions>>): IChartistPieChart;
  }

  interface IChartistLineChart extends IChartistBase<ILineChartOptions> {
    new (target: any, data: IChartistData, options?: ILineChartOptions, responsiveOptions?: Array<IResponsiveOptionTuple<ILineChartOptions>>): IChartistLineChart;
  }

  interface IChartistBarChart extends IChartistBase<IBarChartOptions> {
    new (target: any, data: IChartistData, options?: IBarChartOptions, responsiveOptions?: Array<IResponsiveOptionTuple<IBarChartOptions>>): IChartistBarChart;
  }

  interface IChartOptions {

    reverseData?: boolean;

    plugins?: Array<any>;
  }

  interface IPieChartOptions extends IChartOptions {

    width?: number | string;

    height?: number | string;

    chartPadding?: IChartPadding | number;

    classNames?: IPieChartClasses;

    startAngle?: number;

    total?: number;

    donut?: boolean;

    donutWidth?: number;

    showLabel?: boolean;

    labelOffset?: number;

    labelPosition?: string;

    labelInterpolationFnc?: Function;

    labelDirection?: string;
  }

  interface IChartPadding {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  }

  interface IPieChartClasses {
    chartPie?: string;
    chartDonut?: string;
    series?: string;
    slicePie?: string;
    sliceDonut?: string;
    label?: string;
  }

  interface IBarChartOptions extends IChartOptions {
    axisX?: IBarChartAxis;
    axisY?: IBarChartAxis;
    width?: number | string;
    height?: number | string;
    high?: number;
    low?: number;
    ticks?: Array<string | number>;
    onlyInteger?: boolean;
    chartPadding?: IChartPadding;
    seriesBarDistance?: number;

    stackBars?: boolean;

    horizontalBars?: boolean;
    distributeSeries?: boolean;
  }

  interface IBarChartAxis {
    offset?: number;
    position?: string;
    labelOffset?: {
      x?: number;
      y?: number;
    };
    showLabel?: boolean;
    showGrid?: boolean;
    labelInterpolationFnc?: Function;
    scaleMinSpace?: number;
    onlyInteger?: boolean;
  }

  interface IBarChartClasses {
    chart?: string;
    horizontalBars?: string;
    label?: string;
    labelGroup?: string;
    series?: string;
    bar?: string;
    grid?: string;
    gridGroup?: string;
    vertical?: string;
    horizontal?: string;
    start?: string;
    end?: string;
  }

  interface ILineChartOptions extends IChartOptions {
    axisX?: IChartistStepAxis | IChartistFixedScaleAxis | IChartistAutoScaleAxis;
    axisY?: IChartistStepAxis | IChartistFixedScaleAxis | IChartistAutoScaleAxis;
    width?: number | string;
    height?: number | string;
    showLine?: boolean;
    showPoint?: boolean;
    showArea?: boolean;
    areaBase?: number;
    lineSmooth?: Function | boolean;
    low?: number;
    high?: number;
    ticks?: Array<string | number>;
    chartPadding?: IChartPadding;
    fullWidth?: boolean;
    classNames?: ILineChartClasses;
  }

  interface ILineChartAxis {
    offset?: number;
    position?: string;
    labelOffset?: {
      x?: number;
      y?: number;
    };
    showLabel?: boolean;
    showGrid?: boolean;
    labelInterpolationFnc?: Function;
  }

  interface IChartistStepAxis extends ILineChartAxis {
    type?: IStepAxisStatic;
    ticks?: Array<string> | Array<number>;
    stretch?: boolean;
  }

  interface IChartistFixedScaleAxis extends ILineChartAxis {
    type?: IFixedScaleAxisStatic;
    high?: number;
    low?: number;
    divisor?: number;
    ticks?: Array<string> | Array<number>;
  }

  interface IChartistAutoScaleAxis extends ILineChartAxis {
    high?: number;
    low?: number;
    scaleMinSpace?: number;
    onlyInteger?: boolean;
    referenceValue?: number;
    type?: IAutoScaleAxisStatic;
  }

  interface ILineChartClasses {
    chart?: string;
    label?: string;
    labelGroup?: string;
    series?: string;
    line?: string;
    point?: string;
    area?: string;
    grid?: string;
    gridGroup?: string;
    vertical?: string;
    horizontal?: string;
    start?: string;
    end?: string;
  }

  interface ChartistSvgStatic {
    new (name: HTMLElement | string, attributes: Object, className?: string, parent?: Object, insertFirst?: boolean): IChartistSvg;

    Easing: ChartistEasingStatic;

    isSupported(feature: string): boolean;
  }

  interface IChartistSvg {

    attr(attributes: Object | string, ns: string): Object | string;

    elem(name: string, attributes?: Object, className?: string, insertFirst?: boolean): IChartistSvg;

    parent(): IChartistSvg;

    root(): IChartistSvg;

    querySelector(selector: string): IChartistSvg;

    querySelectorAll(selector: string): any; // this returns an svg wrapper list in the docs, need to see if that's just an array or a special list

    foreignObject(content: any, attributes?: Object, className?: string, insertFirst?: boolean): IChartistSvg;

    text(t: string): IChartistSvg;

    empty(): IChartistSvg;

    remove(): IChartistSvg;

    replace(): IChartistSvg;

    append(element: IChartistSvg, insertFirst?: boolean): IChartistSvg;

    classes(): Array<string>;

    addClass(names: string): IChartistSvg;

    removeClass(names: string): IChartistSvg;

    removeAllClasses(): IChartistSvg;

    height(): number;

    animate(animations: IChartistAnimations, guided: boolean, eventEmitter: Object): IChartistSvg;

    getBBoxProperty(node: SVGElement, prop: string): string; // TODO: find a good example of this and add it to the tests, it might belong to static
  }

  interface IChartistAnimations {
    [Key: string]: IChartistAnimationOptions;
  }

  interface IChartistAnimationOptions {
    id?: string;
    dur: string | number;
    from: string | number;
    to: string | number;
    easing?: IChartistEasingDefinition | string;
    fill?: string;
    begin?: string;
  }

  interface IChartistEasingDefinition {
    0: number;
    1: number;
    2: number;
    3: number;
  }

  interface ChartistEasingStatic {
    easeInSine: IChartistEasingDefinition;
    easeOutSine: IChartistEasingDefinition;
    easeInOutSine: IChartistEasingDefinition;
    easeInQuad: IChartistEasingDefinition;
    easeOutQuad: IChartistEasingDefinition;
    easeInOutQuad: IChartistEasingDefinition;
    easeInCubic: IChartistEasingDefinition;
    easeOutCubic: IChartistEasingDefinition;
    easeInOutCubic: IChartistEasingDefinition;
    easeInQuart: IChartistEasingDefinition;
    easeOutQuart: IChartistEasingDefinition;
    easeInOutQuart: IChartistEasingDefinition;
    easeInQuint: IChartistEasingDefinition;
    easeOutQuint: IChartistEasingDefinition;
    easeInOutQuint: IChartistEasingDefinition;
    easeInExpo: IChartistEasingDefinition;
    easeOutExpo: IChartistEasingDefinition;
    easeInOutExpo: IChartistEasingDefinition;
    easeInCirc: IChartistEasingDefinition;
    easeOutCirc: IChartistEasingDefinition;
    easeInOutCirc: IChartistEasingDefinition;
    easeInBack: IChartistEasingDefinition;
    easeOutBack: IChartistEasingDefinition;
    easeInOutBack: IChartistEasingDefinition;
  }

  interface ChartistInterpolationStatic {

    none(options?: IChartistInterpolationOptions): Function;

    simple(options?: IChartistSimpleInterpolationOptions): Function;

    cardinal(options?: IChartistCardinalInterpolationOptions): Function;

    step(options?: IChartistStepInterpolationOptions): Function;
  }

  interface IChartistInterpolationOptions {
    fillHoles?: boolean;
  }

  interface IChartistSimpleInterpolationOptions extends IChartistInterpolationOptions {
    divisor?: number;
  }

  interface IChartistCardinalInterpolationOptions extends IChartistInterpolationOptions {
    tension?: number;
  }

  interface IChartistStepInterpolationOptions extends IChartistInterpolationOptions {
    postpone?: boolean;
  }
}

var Chartist: Chartist.ChartistStatic;

export = Chartist;
export as namespace Chartist;
}
