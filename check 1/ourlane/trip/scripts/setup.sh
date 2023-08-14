echo "script started for AM"
echo "${@}";

init() {
    echo "init script"
    node --version
    npm i -g yarn
    yarn
    yarn build
}

migrate() {
    echo "migrate script"
    yarn dbmigrate
}

loadAcl() {
    echo "load acl script"
    yarn loadAcl
}

enroll() {
    echo "enroll script"
    yarn enroll "${@}"
}

if [ "${1}" == "everything" ]; then
    init
    migrate
    loadAcl
    enroll "${@}"
elif [ "${1}" == "migrate" ]; then
    migrate
elif [ "${1}" == "loadAcl" ]; then
    loadAcl
elif [ "${1}" == "enroll" ]; then # --userId eventUser --role SUPER_ADMIN --userName 'Event User'
    enroll "${@}"
fi
echo "script ended"
