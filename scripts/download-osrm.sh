if [ ! -d "data/osrm/argentina" ]
then 
    wget https://s3.amazonaws.com/run-forrest/argentina.tar.gz
    pwd
    ls
    mkdir -p data/osrm
    tar zxvf argentina.tar.gz -C data/osrm
fi