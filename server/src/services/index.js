const TestService = require('./test-service');
const ContactService = require('./contact-service');
const ContactDownloadService = require('./contact-download-service');
const ContactUploadService = require('./contact-upload-service');

module.exports = ({repositories, validators, configService, logService}) => {
    const services = {};
    services.contact = new ContactService({repositories, validators});
    services.log = logService;
    services.config = configService;
    services.test = new TestService(repositories['test']);
    services.download = new ContactDownloadService({services});
    services.upload = new ContactUploadService({services});
    return services;
};
