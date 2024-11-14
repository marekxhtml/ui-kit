import {CoreEngine, CoreEngineNext} from '../../engine.js';
import {
  ControllersMap,
  ControllersPropsMap,
  EngineDefinitionBuildResult,
  EngineDefinitionControllersPropsOption,
  OptionsExtender,
  OptionsTuple,
} from './common.js';

export interface BuildOptions<TEngineOptions> {
  extend?: OptionsExtender<TEngineOptions>;
}

export interface BuildWithList<
  TEngine extends CoreEngine | CoreEngineNext,
  TEngineOptions,
  TControllersMap extends ControllersMap,
  TControllersProps extends ControllersPropsMap,
> {
  /**
   * Initializes an engine and controllers from the definition.
   */
  (
    c: (keyof TControllersMap)[],
    ...params: OptionsTuple<
      BuildOptions<TEngineOptions> &
        EngineDefinitionControllersPropsOption<TControllersProps>
    >
  ): Promise<EngineDefinitionBuildResult<TEngine, TControllersMap>>;
}

export interface Build<
  TEngine extends CoreEngine | CoreEngineNext,
  TEngineOptions,
  TControllersMap extends ControllersMap,
  TControllersProps extends ControllersPropsMap,
> {
  /**
   * Initializes an engine and controllers from the definition.
   */
  (
    ...params: OptionsTuple<
      BuildOptions<TEngineOptions> &
        EngineDefinitionControllersPropsOption<TControllersProps>
    >
  ): Promise<EngineDefinitionBuildResult<TEngine, TControllersMap>>;
}
