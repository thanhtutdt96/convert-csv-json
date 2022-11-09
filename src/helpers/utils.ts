const removeDoubleQuotes = (input: string) => input.replace(/^"(.*)"$/, '$1');

export const csvToJSON = (csv: string) => {
  const lines = csv.split('\n');

  const result = [];

  const ignoreCommasInQuotesPattern = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;

  const headers = lines?.[0]
    ?.split(ignoreCommasInQuotesPattern)
    ?.map((line) => removeDoubleQuotes(line?.trim()));

  for (let i = 1; i < lines.length; i++) {
    if (lines[i] == '\n' || lines[i].trim().length == 0) {
      continue;
    }

    const temporaryObject: Record<string, unknown> = {};
    const currentLine = lines[i]
      ?.split(ignoreCommasInQuotesPattern)
      ?.map((line) => removeDoubleQuotes(line?.trim()));

    for (let j = 0; j < headers.length; j++) {
      const objectHeader = headers[j]?.toLowerCase();
      temporaryObject[objectHeader] = currentLine[j];
    }

    result.push(temporaryObject);
  }

  return JSON.stringify(result, null, ' ');
};

const replacer = function (key: string, value: unknown) {
  return value === null ? '' : value;
};

export const jsonToCsv = (json: string) => {
  const convertedString = JSON.stringify(json)
    .replace(/[\u2018\u2019]/g, "\\'")
    .replace(/[\u201C\u201D]/g, '\\"')
    .replace(/\\n/g, '')
    .replace(/\\t/g, '');

  const parsedArray = JSON.parse(JSON.parse(convertedString)) as Record<string, unknown>[];

  const fields = Object.keys(parsedArray[0]);

  const csv = parsedArray.map((row) => {
    return fields
      .map(function (fieldName) {
        return JSON.stringify(row[fieldName], replacer);
      })
      .join(',');
  });

  csv.unshift(fields.join(','));

  return csv.join('\r\n');
};

export const exportData = (data: string, fileName: string) => {
  const blob = new Blob([data], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = fileName;
  link.href = url;
  link.click();
};
