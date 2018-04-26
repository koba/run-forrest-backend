if [ ! -d "data/osrm/argentina" ]
then 
    mkdir -p data/osrm
    cd data/osrm
    wget https://s3.amazonaws.com/run-forrest/argentina.tar.gz
    tar zxvf argentina.tar.gz
    cd ../..
fi