ng build
cp -r dist/browser/* ../

cd ..
git add .
git commit -m "deploy"
git push -f
