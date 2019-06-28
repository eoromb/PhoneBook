const TestService = require('./test-service');
const PhoneRecordService = require('./phone-record-service');
const PhoneRecordDownloadService = require('./phone-record-download-service');
const PhoneRecordUploadService = require('./phone-record-upload-service');

module.exports = ({repositories, validators, configService, logService}) => {
    const services = {};
    services.phonerecord = new PhoneRecordService({repositories, validators});
    services.log = logService;
    services.config = configService;
    services.test = new TestService(repositories['test']);
    services.download = new PhoneRecordDownloadService({services});
    services.upload = new PhoneRecordUploadService({services});
    return services;
};
