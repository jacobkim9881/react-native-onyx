import lodashClone from 'lodash/clone';
import Onyx from '../../lib';
import waitForPromisesToResolve from '../utils/waitForPromisesToResolve';
import OnyxUtils from '../../lib/OnyxUtils';
import type OnyxCache from '../../lib/OnyxCache';
import type {OnyxCollection, OnyxUpdate} from '../../lib/types';
import type GenericCollection from '../utils/GenericCollection';
import type {Connection} from '../../lib/OnyxConnectionManager';

const ONYX_KEYS = {
    TEST_KEY: 'test',
    OTHER_TEST: 'otherTest',
    // Special case: this key is not a collection key, but it has an underscore in its name
    KEY_WITH_UNDERSCORE: 'nvp_test',
    COLLECTION: {
        TEST_KEY: 'test_',
        TEST_CONNECT_COLLECTION: 'testConnectCollection_',
        TEST_POLICY: 'testPolicy_',
        TEST_UPDATE: 'testUpdate_',
        PEOPLE: 'people_',
        ANIMALS: 'animals_',
        SNAPSHOT: 'snapshot_',
        ROUTES: 'routes_',
    },
};

Onyx.init({
    keys: ONYX_KEYS,
    initialKeyStates: {
        [ONYX_KEYS.OTHER_TEST]: 42,
        [ONYX_KEYS.KEY_WITH_UNDERSCORE]: 'default',
    },
    skippableCollectionMemberIDs: ['skippable-id'],
});

describe('Onyx', () => {
    let connection: Connection | undefined;

    /** @type OnyxCache */
    let cache: typeof OnyxCache;

    beforeEach(() => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        cache = require('../../lib/OnyxCache').default;
    });

    afterEach(() => {
        if (connection) {
            Onyx.disconnect(connection);
        }
        return Onyx.clear();
    });

    

    it('should update Snapshot when its data changed', async () => {
        const cat = `${ONYX_KEYS.COLLECTION.ANIMALS}cat`;
        const snapshot1 = `${ONYX_KEYS.COLLECTION.SNAPSHOT}1`;

        //const initialValue = [{name: ['Fluffy', 2]}, {name2: ['Fluffy', 2]}];
        //const initialValue = 'Fluffy';
        const initialValue = {name: 'Fluffy'};
        const finalValue = {name: 'Kitty'};

        await Onyx.set(cat, initialValue);

	    const array1 = [];
        await Onyx.set(snapshot1, {data: {[cat]: initialValue}});
        //await Onyx.set(snapshot1, {data: {[cat]: initialValue}});
	    /*
	    for(let i = 0; i < 5; i++) {

        const initialValue2 = {name: []};
        //const initialValue2 = {name: `sluffy${i}`};
		 array1.push({key: snapshot1, value: {data: {[cat]: initialValue2}}, onyxMethod: Onyx.METHOD.MERGE})
         //await Onyx.merge(cat, initialValue2);
	    }
	    */
        //await Onyx.set(snapshot1, {data: {[cat]: initialValue}});

		    //array1.push({key: cat, value: {data: {[cat]: [1, 2]}} , onyxMethod: Onyx.METHOD.MERGE})
		    //array1.push({key: cat, value: finalValue, onyxMethod: Onyx.METHOD.MERGE})
        const callback = jest.fn();

        Onyx.connect({
            key: ONYX_KEYS.COLLECTION.SNAPSHOT,
            callback,
        });

        //await Onyx.update([...array1, {key: snapshot1, value: {data: {[cat]: [1, 2]}}, onyxMethod: Onyx.METHOD.MERGE}]);
        //await Onyx.update([...array1, {key: snapshot1, value: {data: {[cat]: finalValue}}, onyxMethod: Onyx.METHOD.MERGE}]);
         //await Onyx.update([{key: cat, value: finalValue, onyxMethod: Onyx.METHOD.MERGE}]);
         //await Onyx.update([{key: snapshot1, value: {data: {[cat]: [1, 2]}}, onyxMethod: Onyx.METHOD.MERGE}]);
         //await Onyx.update([{key: cat, value: undefined, onyxMethod: Onyx.METHOD.MERGE}]);
         await Onyx.update([{key: cat, value: null, onyxMethod: Onyx.METHOD.MERGE}]);

         //expect(callback).toBeCalledTimes(2);
         expect(callback).toHaveBeenNthCalledWith(1, {data: {[cat]: {}}}, snapshot1);
         //expect(callback).toHaveBeenNthCalledWith(1, {data: {[cat]: initialValue}}, snapshot1);
        //expect(callback).toHaveBeenNthCalledWith(1, {data: {[cat]: [1, 2]}}, snapshot1);
        //expect(callback).toHaveBeenNthCalledWith(1, {data: {[cat]: []}}, snapshot1);
        //expect(callback).toHaveBeenNthCalledWith(1, {name: [1, 2]}, snapshot1);
        //expect(callback).toHaveBeenNthCalledWith(2, {data: {[cat]: [1, 2]}}, snapshot1);
       // expect(callback).toHaveBeenNthCalledWith(1, {data: {[cat]: finalValue}}, snapshot1);
        //expect(callback).toHaveBeenNthCalledWith(1, {data: {[cat]: finalValue}}, snapshot1);
         //expect(callback).toHaveBeenNthCalledWith(2, {data: {[cat]: finalValue}}, snapshot1);
    });

});
