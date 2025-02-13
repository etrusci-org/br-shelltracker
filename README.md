# br-shelltracker

A helper tool for the game [Buckshot Roulette](https://criticalreflex.io/buckshot_roulette).

Too baked to remember how many live and blank shells there are left?  
Just click `+` or `−` to update the displayed counts and chances whenever the shotgun is reloaded, a shell is used, ejected, or its polarity is flipped.

*Still a bit work in progress.*




## Features

- [x] Keep track of live and blank shells.
- [x] See chance for current shell to be live or blank.
- [x] Works from the filesystem without internet.
- [ ] *More? If you got ideas, open a new [issue](https://github.com/etrusci-org/br-shelltracker/issues) and let me know* 👽

**Still testing these**:
- [ ] User interface must be usable on a smartphone too.



## Usage

To use it, open [dist/index.html](./dist/index.html) in a webbrowser.

I host the latest release on <https://etrusci.org/tool/br-shelltracker>. **(not yet!)**

**But you can also self-host it if you like.**
It works from the local filesystem and has not to be put on a webserver.  
To do so follow these steps:

1. Download the latest [release](https://github.com/etrusci-org/br-shelltracker/releases).  
   In the **Assets** dropdown, download either the **zip** or **tar.gz** file and save it to your computer.
2. Unpack the just downloaded file.
3. You should now see a new folder that was unpacked.  
   Inside that folder should be another folder named **dist** with an **index.html** file inside.  
   E.g. **br-shelltracker-*/dist/index.html**.
4. Double-click **index.html** to open it with your default webbrowser, or right-click it, then choose *open-with...* from the context menu if you do not want to use your default webbrowser.




## License

The MIT License  
See [LICENSE.md](./LICENSE.md) for more.
