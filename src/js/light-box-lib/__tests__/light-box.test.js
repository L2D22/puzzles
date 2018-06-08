import LightBox from '../light-box.js';
// automatic mock
// use to spy on calls to the class constructor
// and all of its methods.
jest.mock('../light-box.js');

beforeEach(() => {
    LightBox.mockClear();
});

it('Check lightbox class constructor', () => {
    const lightbox = new LightBox();
    expect(LightBox).toHaveBeenCalledTimes(1);
});

it('Check lightbox initialize', () => {
    const lightbox = new LightBox();
    const lightBoxInstance = LightBox.mock.instances[0];
    const lightBoxInit = lightBoxInstance.initialize;
    const lightBoxCreateClickTriggers = lightBoxInstance.createClickTriggers;
    const lightBoxCreateBox = lightBoxInstance.createBox;
    lightBoxInit();

    expect(lightBoxInit).toHaveBeenCalledTimes(1);
    //expect(lightBoxCreateBox).toHaveBeenCalledTimes(1);
    //expect(ligthBoxCreateClickTriggers).toHaveBeenCalledTimes(1);
});

// describe('getPrevious()', () => {
//     const data = [1,2,3,4,5];
//     var previousEl = 1;
//     if(previousEl === 1) {
//         previousEl = data[data.length-1];
//     }
//     // set element to previous element
//     else {
//         previousEl = data[data-2];
//     }
//     expect(previousEl).toEqual(5);
//     //expect(lightBoxLib.displayBoxContent).toHaveBeenCalled();
// });


// it('Check lightbox getPrevious', () => {
//   const lightbox = new LightBox();
//   lightbox.getPrevious();
//   expect(lightbox.getPrevious).toHaveBeenCalled();
//   //expect(mockPlaySoundFile.mock.calls[0][0]).toEqual(coolSoundFileName);
// });
