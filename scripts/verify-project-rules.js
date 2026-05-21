/* eslint-disable @typescript-eslint/no-require-imports */

const path = require('path');

function normalizeRelativePath(filePath, projectRoot) {
  return path.relative(projectRoot, filePath).split(path.sep).join('/');
}

function getDataPathParts(filePath, projectRoot) {
  const relativePath = normalizeRelativePath(filePath, projectRoot);
  const prefix = 'src/data/';
  if (!relativePath.startsWith(prefix)) {
    return [];
  }

  return relativePath.slice(prefix.length).split('/');
}

function isTenantPropertyRootFile(filePath, projectRoot) {
  const parts = getDataPathParts(filePath, projectRoot);
  if (parts.length !== 2) {
    return false;
  }

  const [tenant, fileName] = parts;
  return (
    tenant !== 'main-board' &&
    tenant !== 'biblioteket' &&
    fileName.endsWith('.json')
  );
}

function isCoordinateMapFile(filePath, projectRoot) {
  const relativePath = normalizeRelativePath(filePath, projectRoot);
  return relativePath.startsWith('src/data/main-board/aktorer/') &&
    relativePath.endsWith('-coordinates.json');
}

function isConcreteStreetAddress(address) {
  return /\d/.test(address);
}

function isAllowedNullablePath(filePath, projectRoot, valuePath) {
  if (isTenantPropertyRootFile(filePath, projectRoot)) {
    if (['gnr', 'bnr', 'heroImage', 'mapImage', 'coordinates', 'plaaceAnalyses'].includes(valuePath)) {
      return true;
    }

    if (valuePath.startsWith('plaaceData.nokkeldata.')) {
      return true;
    }
  }

  if (
    valuePath.startsWith('plaaceData.nokkeldata.') ||
    valuePath.startsWith('plaaceData.demografi.') ||
    valuePath.startsWith('plaaceData.marked.')
  ) {
    return true;
  }

  return false;
}

function checkObjectForNulls(data, filePath, projectRoot, issues, prefix = '') {
  for (const [key, value] of Object.entries(data)) {
    const valuePath = prefix ? `${prefix}.${key}` : key;

    if (value === null) {
      if (!isAllowedNullablePath(filePath, projectRoot, valuePath)) {
        issues.push(`Null value: ${valuePath}`);
      }
    } else if (value === undefined) {
      issues.push(`Undefined value: ${valuePath}`);
    } else if (typeof value === 'number' && Number.isNaN(value)) {
      issues.push(`NaN value: ${valuePath}`);
    } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      checkObjectForNulls(value, filePath, projectRoot, issues, valuePath);
    }
  }
}

function verifyPropertyData(data, filePath, projectRoot = path.join(__dirname, '..')) {
  const issues = [];
  const fileName = path.basename(filePath, '.json');

  if (['template', 'registry', 'combined'].includes(fileName)) {
    return issues;
  }

  if (isCoordinateMapFile(filePath, projectRoot)) {
    for (const [address, coordinates] of Object.entries(data)) {
      if (coordinates === null && isConcreteStreetAddress(address)) {
        issues.push(`Missing coordinate: ${address}`);
      }
    }
    return issues;
  }

  if (isTenantPropertyRootFile(filePath, projectRoot) && data.id !== undefined) {
    if (!data.adresse && !data.address) {
      issues.push('Missing: adresse');
    }
  }

  if (Array.isArray(data)) {
    return issues;
  }

  checkObjectForNulls(data, filePath, projectRoot, issues);
  return issues;
}

module.exports = {
  verifyPropertyData,
};
