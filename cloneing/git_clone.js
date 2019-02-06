var Git = require("nodegit");

// Clone a given repository into the `./tmp` folder.
Git.Clone("https://github.com/mymaor89/NumericAnalysis", "./tmp")
  // Display information about the blob.
  .catch(function(err) { console.log(err); });