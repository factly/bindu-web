import React from 'react';
import * as vega from 'vega';
import { compile } from 'vega-lite';

function Chart({ spec, setView }) {
  console.log({ spec });
  const refContainer = React.useRef(null);

  const getSpec = () => {
    return compile(spec).spec;
  };

  const renderVega = () => {
    if (Object.keys(spec).length) {
      const spec = getSpec();
      let runtime = vega.parse(spec);
      const loader = vega.loader();
      const view = new vega.View(runtime, {
        loader,
      }).hover();

      view
        .logLevel(vega.Warn)
        .renderer('svg')
        .initialize(refContainer.current)
        .runAsync()
        .then(() => {
          view.runAfter(() => {
            console.log({ viewState: view.getState() });
            console.log({ _runtime: view._runtime });
            console.log({ view });
            setView(view);
          });
        });
    }
  };

  React.useEffect(() => {
    renderVega();
    // eslint-disable-next-line
  }, [spec]);

  return <div className="chart-container" ref={refContainer}></div>;
}

export default Chart;

/*<div className="download-container">
          <button type="button" onClick={this.download}>
            Download
          </button>
          <button type="button" onClick={this.openInEditor}>
            Open in Editor
          </button>
        </div>*/
// function Chart(props){
// 	const chartEl = useRef(null);

// 	const options = ChartConfigs[props.path].options;
// 	const spec = ChartConfigs[props.path].spec;

// 	function renderVega() {
// 		const { renderer } = spec;

// 	    let runtime = vega.parse(compile(spec).spec);
// 	    const loader = vega.loader();
// 	    const view = new vega.View(runtime, {
// 	      loader,
// 	    }).hover();
// 		debugger;
// 	    view.logLevel(vega.Warn).renderer(renderer).initialize(chartEl).runAsync();
// 	}

// 	useEffect(() => {

// 	    renderVega();

// 	  });

// 	return (
// 		<div ref={chartEl}></div>
// 	);
// }

// export default Chart;
