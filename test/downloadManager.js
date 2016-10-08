var PromiseSeries = require('../');
var DownloadManager = require('./utils/DownloadManager');

var downloadManager = new DownloadManager();

var p = new PromiseSeries();
p.add(downloadManager.downloadWebPage.bind(this), 'google.com');
p.add(downloadManager.downloadAsset.bind(this), '/assets/1.jpg');
p.add(downloadManager.downloadWebPage.bind(this), 'amazon.com');
p.add(downloadManager.downloadAsset.bind(this), '/assets/2.jpg');
p.start()
    .then(results => {
        console.log(results);
    })
    .catch(error => {
        console.log(error);
    });
