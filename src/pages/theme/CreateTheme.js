import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import ThemeForm from './components/ThemeForm';
import Display from './components/Display';
import TemplateSelect from '../templates/components/TemplateSelect';

import { addTheme } from '../../actions/themes';
import { collapseSider } from '../../actions/settings';

function CreateTheme() {
  const [themeConfig, setConfig] = React.useState({});

  const history = useHistory();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(collapseSider());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCreate = (values) => {
    dispatch(addTheme(values)).then(() => history.push('/themes'));
  };

  const onChange = (values) => {
    if (values.config) {
      try {
        const config = JSON.parse(values.config);
        setConfig(config);
      } catch {
        console.log('Config is not JSON');
      }
    }
  };

  return (
    <div style={{ display: 'flex', height: '80vh' }}>
      <div style={{ flex: 1, height: '100%', overflow: 'auto' }}>
        <TemplateSelect theme={themeConfig} />
      </div>
      <div style={{ flex: 1, height: '100%', overflow: 'auto' }}>
        <ThemeForm onSubmit={onCreate} onChange={onChange} data={themeConfig} />
      </div>
    </div>
  );
}

export default CreateTheme;
