# Mopidy Material Client Readme

## Builds
Create builds with command `npm run build`.
Copy the build folder into the Mopidy client folder under new name static: `rm -r /path/to/client/static && cp -r build /path/to/client/static`
Alternatively, create a static link to the build folder: `ln -sfrn /path/to/build /path/to/client/static`  

## FAQ

### Rebuild library index
If some covers are now shown in the frontend, the quickest fix is a complete rescan of the music library:  
`sudo chmod 777 path/to/music/folder -R && sudo mopidyctl local scan --force`

### Restart service after Linux upgrade
After upgrading your Linux distro, the Mopidy service might need to be enabled again.  
**Check**  
`systemctl status mopidy.service`  
**Enable**  
`sudo systemctl enable mopidy.service`  
**Restart**  
`sudo systemctl restart mopidy.service`  