import * as Chart from "typings/chartjs";


declare module "typings/chartjs" {
//declare namespace Chartex {
	interface Chart {
		getDatasetMeta: (i: number) => void
	}

	interface ChartDSMeta {			//plugin defs
		hidden?: boolean;
		data?: MetaPoints[]
	}

	interface MetaPoints {			//plugin defs
		tooltipPosition: () => {x: number, y: number, padding: number};
		_datasetIndex: number;
		_index: number;
		_model: {
			x: number;
			y: number;
			skip: boolean;
			radius: number;
			xScale: object;
			yScale: object;
		}
		_view: {
			x: number;
			y: number;
			skip: boolean;
			radius: number;
			borderColor: string;
			fillColor: string;
		}
		_chart: object;
	}

	interface ChartDataSets {
		data?: number[] | ChartPoint[];
	}

	interface ChartPoint { 		//plugin defs
		r?: number;
		e?: number;
	}

	interface ChartOptions {
		errorbarPlugin?: errorBarPlug;		//plugin defs
	}

	interface errorBarPlug {
		showErrors?: boolean;			//plugin defs
	}

	interface ChartDataSets {
		showErrors?: boolean;		//plugin defs
		showCap?: boolean;
		capLen?: number;
		errStyle?: "circle" | "oval" | "ellipse" | "line"| "T" | "rect";
		errors?: number[];
		xErrors?: number[];
		yErrors?: number[];
	}
}
