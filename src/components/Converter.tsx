import { useState } from 'react';
import { csvToJSON, jsonToCsv } from 'helpers/utils';
import FlashOffIcon from '@mui/icons-material/FlashOff';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import { Button, Container, Grid, TextareaAutosize, useMediaQuery, useTheme } from '@mui/material';
import ConverterActions from 'components/ConverterActions';
import { useAppDispatch } from 'hooks';
import { alert } from 'redux/toastSlice';
import styled from 'styled-components';
import { ToastType } from 'types/Common';

const ContainerStyled = styled(Container)`
  background-color: rgb(255, 255, 255, 0.15);
  box-shadow: 1px 4px 20px rgb(0 0 0 / 10%);
  padding-top: 2rem;
  padding-bottom: 2rem;
  border-radius: 1.5rem;
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);

  .file-picker {
    margin-bottom: 1.5rem;
    color: #fff;

    label {
      font-weight: 600;
    }
  }

  .data-input {
    color: #fff;
    font-weight: 600;
  }

  .form-control {
    margin-top: 0.5rem;
    background-color: #f8f9fa;
  }

  .form-control[type='file'] {
    padding: 0;
    overflow: hidden;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TextAreaInput = styled(TextareaAutosize)`
  min-width: 350px;
  width: 100%;
  border-radius: 0.5rem;
  padding: 0.75rem;
`;

const Converter = () => {
  const dispatch = useAppDispatch();

  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [inputCsvData, setInputCsvData] = useState('');
  const [outputCsvData, setOutputCsvData] = useState('');

  const [inputJsonData, setInputJsonData] = useState('');
  const [outputJsonData, setOutputJsonData] = useState('');

  const [isButtonCsvDisabled, setIsButtonCsvDisabled] = useState(false);
  const [isButtonJsonDisabled, setIsButtonJsonDisabled] = useState(false);

  const errorHandler = (error: unknown) => {
    let errorMessage = '';

    if (error instanceof SyntaxError) {
      errorMessage = error.message;
    } else {
      errorMessage = 'There is an unknown issue';
    }

    dispatch(alert(errorMessage, ToastType.ERROR));
  };

  const onInputCsvDataChange = (data: string) => {
    setIsButtonCsvDisabled(false);
    setOutputJsonData('');
    setInputCsvData(data);
  };

  const onOutputCsvDataChange = (data: string) => {
    setIsButtonJsonDisabled(false);
    setOutputCsvData('');
    setInputJsonData(data);
  };

  const handleCsvToJsonClick = () => {
    try {
      const newData = csvToJSON(inputCsvData);

      setIsButtonCsvDisabled(true);
      setOutputCsvData(newData);
      setInputJsonData('');
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleJsonToCsvClick = () => {
    try {
      const newData = jsonToCsv(inputJsonData);

      setIsButtonJsonDisabled(true);
      setOutputJsonData(newData);
      setInputCsvData('');
    } catch (error: unknown) {
      errorHandler(error);
    }
  };

  const clearInputCsv = () => {
    setInputCsvData('');
    setOutputJsonData('');
  };

  const clearInputJson = () => {
    setInputJsonData('');
    setOutputCsvData('');
  };

  const handleCsvChange = (files: FileList | null) => {
    if (!files || !files.length) {
      dispatch(alert('File is not exist', ToastType.ERROR));

      return;
    }

    const inputFile = files?.[0];
    const fileExtension = inputFile?.type.split('/')[1];

    if (!['csv'].includes(fileExtension)) {
      dispatch(alert('Please input a csv file', ToastType.ERROR));

      return;
    }

    const reader = new FileReader();

    reader.onload = async ({ target }) => {
      const readData = target?.result as string;

      clearInputCsv();
      setInputCsvData(readData);
      setIsButtonCsvDisabled(false);

      dispatch(alert('CSV data import successfully', ToastType.SUCCESS));
    };
    reader.readAsText(inputFile);
  };

  const handleJsonChange = (files: FileList | null) => {
    if (!files || !files.length) {
      dispatch(alert('File is not exist', ToastType.ERROR));

      return;
    }

    const inputFile = files?.[0];
    const fileExtension = inputFile?.type.split('/')[1];

    if (!['json'].includes(fileExtension)) {
      dispatch(alert('Please input a json file', ToastType.ERROR));

      return;
    }

    const reader = new FileReader();

    reader.onload = async ({ target }) => {
      const readData = target?.result as string;

      clearInputJson();
      setInputJsonData(readData);
      setIsButtonJsonDisabled(false);

      dispatch(alert('JSON data import successfully', ToastType.SUCCESS));
    };
    reader.readAsText(inputFile);
  };

  return (
    <ContainerStyled>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} md={5}>
          <div className="file-picker">
            <label htmlFor="csv-upload">
              <span>Upload CSV</span>
              <input
                className="form-control"
                type="file"
                name="csv-upload"
                accept="text/csv"
                onChange={(event) => handleCsvChange(event.target.files)}
              />
            </label>
          </div>
          <div className="data-input">
            <span>Or paste your data here</span>
            <TextAreaInput
              aria-label="input textarea"
              name="csv-input"
              value={inputCsvData && !outputJsonData ? inputCsvData : outputJsonData}
              minRows={isMobileScreen ? 8 : 15}
              maxRows={isMobileScreen ? 8 : 15}
              placeholder="Put your data here..."
              onChange={(event) => onInputCsvDataChange(event.target.value)}
              className="form-control"
            />
          </div>
          <ConverterActions
            content={inputCsvData && !outputJsonData ? inputCsvData : outputJsonData}
            onClearInput={() => clearInputCsv()}
            exportFileName={`export_${Date.now()}.csv`}
            errorHandler={(error) => errorHandler(error)}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <ButtonWrapper>
            <Button
              variant="contained"
              color="primary"
              title="CSV to JSON"
              onClick={handleCsvToJsonClick}
              startIcon={<FlashOnIcon />}
              fullWidth={false}
              disabled={isButtonCsvDisabled || !inputCsvData}
              style={{ marginBottom: '1rem' }}
            >
              CSV =&gt; JSON
            </Button>
            <Button
              variant="contained"
              color="success"
              title="JSON to CSV"
              fullWidth={false}
              onClick={handleJsonToCsvClick}
              startIcon={<FlashOffIcon />}
              disabled={isButtonJsonDisabled || !inputJsonData}
            >
              JSON =&gt; CSV
            </Button>
          </ButtonWrapper>
        </Grid>
        <Grid item xs={12} md={5}>
          <div className="file-picker">
            <label htmlFor="json-upload">
              <span>Upload JSON</span>
              <input
                className="form-control"
                type="file"
                name="json-upload"
                accept="application/json"
                onChange={(event) => handleJsonChange(event.target.files)}
              />
            </label>
          </div>
          <div className="data-input">
            <span>Or paste your data here</span>
            <TextAreaInput
              value={inputJsonData && !outputCsvData ? inputJsonData : outputCsvData}
              aria-label="output textarea"
              minRows={isMobileScreen ? 8 : 15}
              maxRows={isMobileScreen ? 8 : 15}
              placeholder="Magic is coming..."
              onChange={(event) => onOutputCsvDataChange(event.target.value)}
              className="form-control"
            />
          </div>
          <ConverterActions
            content={inputJsonData && !outputCsvData ? inputJsonData : outputCsvData}
            onClearInput={() => clearInputJson()}
            exportFileName={`export_${Date.now()}.json`}
            errorHandler={(error) => errorHandler(error)}
          />
        </Grid>
      </Grid>
    </ContainerStyled>
  );
};

export default Converter;
