/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

const bumpPackageVersion = require('../bump-all-updated-packages/bump-package-version');
const {writeFileSync} = require('fs');
const path = require('path');

jest.mock('fs', () => ({
  writeFileSync: jest.fn(),
  readFileSync: jest.fn(() => '{}'),
}));

describe('bumpPackageVersionTest', () => {
  it('updates patch version of the package', () => {
    const mockedPackageLocation = '~/packages/assets';
    const mockedPackageManifest = {
      name: '@react-native/test',
      version: '1.2.3',
    };

    bumpPackageVersion(mockedPackageLocation, mockedPackageManifest);

    expect(writeFileSync).toHaveBeenCalledWith(
      path.join(mockedPackageLocation, 'package.json'),
      JSON.stringify({...mockedPackageManifest, version: '1.2.4'}, null, 2) +
        '\n',
      'utf-8',
    );
  });
});
