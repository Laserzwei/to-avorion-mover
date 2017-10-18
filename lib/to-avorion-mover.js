'use babel';

import ToAvorionMoverView from './to-avorion-mover-view';
import { CompositeDisposable } from 'atom';
import { Directory } from 'atom';
import fs from 'fs-plus';
const path = require('path');

export default {

  //toAvorionMoverView: null,
  //modalPanel: null,
  subscriptions: null,
  avorionSteam: "E:\\Program Files (x86)\\Steam\\steamapps\\common\\Avorion",
  foldersToCopy: ["mods", "data"],

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'to-avorion-mover:copy': () => this.copy()
    }));

  },

  deactivate() {
    this.subscriptions.dispose();
  },

  serialize() {
  },

  toTargetPath(pathIn, rootFolder){
    //let dir = atom.config.get('avorionInstallDir');
    avorionInstallDir = path.join(this.avorionSteam, rootFolder);
    str = pathIn.split(rootFolder).pop();
    return avorionInstallDir + str
  },

  copyFolder(dir, rootFolder) {
    var fileList = fs.readdirSync(dir)
    for (var i = 0; i < fileList.length; i++) {
      var pfad = path.join(dir, fileList[i])
      //var pfad = dir + "\\" + fileList[i]
      var targetPath = this.toTargetPath(pfad, rootFolder)
      if (fs.statSync(pfad).isDirectory()) {
        if (fs.existsSync(targetPath)) {
        }else{
          console.log(targetPath)
          fs.mkdirSync(targetPath);
        }
        this.copyFolder(pfad, rootFolder);
      }else {
        console.log(targetPath)
        fs.createReadStream(pfad).pipe(fs.createWriteStream(targetPath));
      }
    }
  },

  copy() {
    console.log('ToAvorionMover was toggled!');
    [pP, relativePath] = atom.project.relativizePath(atom.workspace.getActivePaneItem().buffer.file.path);
    for (i in this.foldersToCopy){
      var subFolder = this.foldersToCopy[i]
      projectPath = path.join(pP, subFolder);
      direct = new Directory(projectPath);
      if (direct.existsSync()) {
        this.copyFolder(projectPath, subFolder)
        atom.notifications.addSuccess(projectPath + "\n Successfully copied");
      }else{
        atom.notifications.addWarning(projectPath + "\nDoes not exits");
      }
    }
  }

};
