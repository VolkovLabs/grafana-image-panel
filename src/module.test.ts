import { PanelPlugin } from '@grafana/data';
import { ImageSizeModes } from './constants';
import { plugin } from './module';

/*
 Plugin
 */
describe('plugin', () => {
  it('Should be instance of PanelPlugin', () => {
    expect(plugin).toBeInstanceOf(PanelPlugin);
  });

  it('Should add inputs', () => {
    /**
     * Builder
     */
    const builder: any = {
      addFieldNamePicker: jest.fn().mockImplementation(() => builder),
      addNumberInput: jest.fn().mockImplementation(() => builder),
      addRadio: jest.fn().mockImplementation(() => builder),
    };

    /**
     * Inputs
     */
    plugin['registerOptionEditors'](builder);
    expect(builder.addFieldNamePicker).toHaveBeenCalled();
    expect(builder.addNumberInput).toHaveBeenCalled();
    expect(builder.addRadio).toHaveBeenCalled();
  });

  it('Should show height input if custom', () => {
    const builder: any = {
      addFieldNamePicker: jest.fn().mockImplementation(() => builder),
      addNumberInput: jest.fn().mockImplementation((config) => {
        return {
          ...builder,
          numberField: config,
        };
      }),
      addRadio: jest.fn().mockImplementation(() => builder),
    };

    const result = plugin['registerOptionEditors'](builder);

    /**
     * Height
     */
    expect(result.numberField.showIf({ heightMode: ImageSizeModes.CUSTOM })).toBeTruthy();
    expect(result.numberField.showIf({ heightMode: ImageSizeModes.AUTO })).not.toBeTruthy();
  });
});
