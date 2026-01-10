import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\VacationController::index
* @see app/Http/Controllers/VacationController.php:14
* @route '/admin/vacations'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/vacations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VacationController::index
* @see app/Http/Controllers/VacationController.php:14
* @route '/admin/vacations'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VacationController::index
* @see app/Http/Controllers/VacationController.php:14
* @route '/admin/vacations'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VacationController::index
* @see app/Http/Controllers/VacationController.php:14
* @route '/admin/vacations'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VacationController::index
* @see app/Http/Controllers/VacationController.php:14
* @route '/admin/vacations'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VacationController::index
* @see app/Http/Controllers/VacationController.php:14
* @route '/admin/vacations'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VacationController::index
* @see app/Http/Controllers/VacationController.php:14
* @route '/admin/vacations'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\VacationController::create
* @see app/Http/Controllers/VacationController.php:26
* @route '/admin/vacations/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/vacations/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VacationController::create
* @see app/Http/Controllers/VacationController.php:26
* @route '/admin/vacations/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VacationController::create
* @see app/Http/Controllers/VacationController.php:26
* @route '/admin/vacations/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VacationController::create
* @see app/Http/Controllers/VacationController.php:26
* @route '/admin/vacations/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VacationController::create
* @see app/Http/Controllers/VacationController.php:26
* @route '/admin/vacations/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VacationController::create
* @see app/Http/Controllers/VacationController.php:26
* @route '/admin/vacations/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VacationController::create
* @see app/Http/Controllers/VacationController.php:26
* @route '/admin/vacations/create'
*/
createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

create.form = createForm

/**
* @see \App\Http\Controllers\VacationController::store
* @see app/Http/Controllers/VacationController.php:34
* @route '/admin/vacations'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/vacations',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\VacationController::store
* @see app/Http/Controllers/VacationController.php:34
* @route '/admin/vacations'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VacationController::store
* @see app/Http/Controllers/VacationController.php:34
* @route '/admin/vacations'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VacationController::store
* @see app/Http/Controllers/VacationController.php:34
* @route '/admin/vacations'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VacationController::store
* @see app/Http/Controllers/VacationController.php:34
* @route '/admin/vacations'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\VacationController::edit
* @see app/Http/Controllers/VacationController.php:52
* @route '/admin/vacations/{vacation}/edit'
*/
export const edit = (args: { vacation: number | { id: number } } | [vacation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/vacations/{vacation}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VacationController::edit
* @see app/Http/Controllers/VacationController.php:52
* @route '/admin/vacations/{vacation}/edit'
*/
edit.url = (args: { vacation: number | { id: number } } | [vacation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { vacation: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { vacation: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            vacation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        vacation: typeof args.vacation === 'object'
        ? args.vacation.id
        : args.vacation,
    }

    return edit.definition.url
            .replace('{vacation}', parsedArgs.vacation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VacationController::edit
* @see app/Http/Controllers/VacationController.php:52
* @route '/admin/vacations/{vacation}/edit'
*/
edit.get = (args: { vacation: number | { id: number } } | [vacation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VacationController::edit
* @see app/Http/Controllers/VacationController.php:52
* @route '/admin/vacations/{vacation}/edit'
*/
edit.head = (args: { vacation: number | { id: number } } | [vacation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VacationController::edit
* @see app/Http/Controllers/VacationController.php:52
* @route '/admin/vacations/{vacation}/edit'
*/
const editForm = (args: { vacation: number | { id: number } } | [vacation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VacationController::edit
* @see app/Http/Controllers/VacationController.php:52
* @route '/admin/vacations/{vacation}/edit'
*/
editForm.get = (args: { vacation: number | { id: number } } | [vacation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VacationController::edit
* @see app/Http/Controllers/VacationController.php:52
* @route '/admin/vacations/{vacation}/edit'
*/
editForm.head = (args: { vacation: number | { id: number } } | [vacation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

edit.form = editForm

/**
* @see \App\Http\Controllers\VacationController::update
* @see app/Http/Controllers/VacationController.php:62
* @route '/admin/vacations/{vacation}'
*/
export const update = (args: { vacation: number | { id: number } } | [vacation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/vacations/{vacation}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\VacationController::update
* @see app/Http/Controllers/VacationController.php:62
* @route '/admin/vacations/{vacation}'
*/
update.url = (args: { vacation: number | { id: number } } | [vacation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { vacation: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { vacation: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            vacation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        vacation: typeof args.vacation === 'object'
        ? args.vacation.id
        : args.vacation,
    }

    return update.definition.url
            .replace('{vacation}', parsedArgs.vacation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VacationController::update
* @see app/Http/Controllers/VacationController.php:62
* @route '/admin/vacations/{vacation}'
*/
update.put = (args: { vacation: number | { id: number } } | [vacation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\VacationController::update
* @see app/Http/Controllers/VacationController.php:62
* @route '/admin/vacations/{vacation}'
*/
update.patch = (args: { vacation: number | { id: number } } | [vacation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\VacationController::update
* @see app/Http/Controllers/VacationController.php:62
* @route '/admin/vacations/{vacation}'
*/
const updateForm = (args: { vacation: number | { id: number } } | [vacation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VacationController::update
* @see app/Http/Controllers/VacationController.php:62
* @route '/admin/vacations/{vacation}'
*/
updateForm.put = (args: { vacation: number | { id: number } } | [vacation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VacationController::update
* @see app/Http/Controllers/VacationController.php:62
* @route '/admin/vacations/{vacation}'
*/
updateForm.patch = (args: { vacation: number | { id: number } } | [vacation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\VacationController::destroy
* @see app/Http/Controllers/VacationController.php:79
* @route '/admin/vacations/{vacation}'
*/
export const destroy = (args: { vacation: number | { id: number } } | [vacation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/vacations/{vacation}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\VacationController::destroy
* @see app/Http/Controllers/VacationController.php:79
* @route '/admin/vacations/{vacation}'
*/
destroy.url = (args: { vacation: number | { id: number } } | [vacation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { vacation: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { vacation: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            vacation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        vacation: typeof args.vacation === 'object'
        ? args.vacation.id
        : args.vacation,
    }

    return destroy.definition.url
            .replace('{vacation}', parsedArgs.vacation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VacationController::destroy
* @see app/Http/Controllers/VacationController.php:79
* @route '/admin/vacations/{vacation}'
*/
destroy.delete = (args: { vacation: number | { id: number } } | [vacation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\VacationController::destroy
* @see app/Http/Controllers/VacationController.php:79
* @route '/admin/vacations/{vacation}'
*/
const destroyForm = (args: { vacation: number | { id: number } } | [vacation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VacationController::destroy
* @see app/Http/Controllers/VacationController.php:79
* @route '/admin/vacations/{vacation}'
*/
destroyForm.delete = (args: { vacation: number | { id: number } } | [vacation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const vacations = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default vacations