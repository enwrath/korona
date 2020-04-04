# Lataa sairasdata ja heitä gittiin
# Eeeeeehkä voisi tehdä järkevämminkin mutta eeeeeeh.
git pull
curl https://w3qa5ydb4l.execute-api.eu-west-1.amazonaws.com/prod/finnishCoronaData/v2 -o data/data.json
git add data/data.json
git commit -m "Automatic data update"
git push origin master
