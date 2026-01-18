# Mopidy Material Client Readme

## Docker Build container

### Start container
Start the docker build container with
```
docker compose -f docker/docker-compose.yaml run nodejs bash
```

### React Web App
Switch to the react folder, install the packages and build the react app,
```
cd react
npm install
npm run build
```
This creates the react app in the folder `^/mopidy_material_client/public`.

### Pip package
Run the following command
```
python3 setup.py sdist bdist_wheel
```
This will create the pip packages in the dist folder,
```
.
├── dist
│   ├── Mopidy-Material-Client-X.Y.Z.tar.gz
│   └── Mopidy_Material_Client-X.Y.Z-py3-none-any.whl
└── ...
```
where `X.Y.Z` is the version set in `^/setup.cfg`

### Install local pip package
In order to install a locally built pip package, use
```
python3 pip install /path/to/Mopidy-Material-Client-X.Y.Z.tar.gz
```

### Enable Extension in Mopidy Config
To enable the extension, add the following line to your `mopidy.conf`,
```
[material-client]
enabled = true
```

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