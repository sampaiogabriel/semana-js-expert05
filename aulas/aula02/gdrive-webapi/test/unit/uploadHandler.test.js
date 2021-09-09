import {
    describe,
    test,
    expect,
    jest
} from '@jest/globals'
import UploadHandler from '../../src/uploadHandler.js'
import TestUtil from '../_util/testUtil.js'
import Routes from './../../src/routes.js'

describe('#UploadHandler test suite', () => {

    const ioObj = {
        to: (id) => ioObj,
        emit: (event, message) => { }
    }

    describe('#registerEvents', () => {
        test('should call onFire and onFinish functions on BusyBoy instance', () => {
            const uploadHandler = new UploadHandler({
                io: ioObj,
                socketId: '01'
            })

            jest.spyOn(uploadHandler, uploadHandler.onFile.name)
                .mockResolvedValue()

            const headers = { 
                'content-type': 'multipart/form-data; boundary='
            }

            const onFinish = jest.fn()
            const busboyInstance = uploadHandler.registerEvents(headers, onFinish)

            const fileStream = TestUtil.generateReadbleStream(['chunk', 'of', 'data'])
            busboyInstance.emit('file', 'fieldname', fileStream, 'filename.txt')

            busboyInstance.listeners("finish")[0].call()

            expect(uploadHandler.onFile).toHaveBeenCalled()

            expect(onFinish).toHaveBeenCalled()
        })
    })


})