import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import TemplateForm from './components/TemplateForm';
import Display from '../charts/display';
import { addTemplate } from '../../actions/templates';
import { collapseSider } from '../../actions/settings';

function CreateTemplate() {
  const [spec, setSpec] = React.useState({});
  const [mode, setMode] = React.useState('vega-lite');

  const history = useHistory();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(collapseSider());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCreate = (values) => {
    dispatch(addTemplate(values)).then(() => history.push('/templates'));
  };

  const onChange = (values) => {
    if (values.spec) {
      try {
        const spec = JSON.parse(values.spec);
        setSpec(spec);
      } catch {
        console.log('Spec is not JSON');
      }
    }
  };

  return (
    <div style={{ display: 'flex', height: '80vh' }}>
      <div style={{ flex: 1, height: '100%', overflow: 'auto' }}>
        <Display spec={spec} mode={mode} />
      </div>
      <div style={{ flex: 1, height: '100%', overflow: 'auto' }}>
        <TemplateForm onSubmit={onCreate} onChange={onChange} onModeChange={setMode} />
      </div>
    </div>
  );
}

export default CreateTemplate;
