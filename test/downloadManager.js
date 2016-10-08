var PromiseSeries = require('../');
var DownloadManager = require('./utils/DownloadManager');

var downloadManager = new DownloadManager();

var p = new PromiseSeries();
p.add(downloadManager.downloadWebPage, 'google.com');
p.add(downloadManager.downloadAsset, '/assets/1.jpg');
p.add(downloadManager.downloadWebPage, 'amazon.com');
p.add(downloadManager.downloadAsset, '/assets/2.jpg');
p.start()
    .then(results => {
        console.log(results);
    })
    .catch(error => {
        console.log(error);
    });
