if [ ! -d "data/osrm/argentina" ]
then 
    wget https://s3.amazonaws.com/run-forrest/argentina.tar.gz
    mkdir -p data/osrm/argentina
    tar zxvf argentina.tar.gz -C data/osrm/argentina
fi