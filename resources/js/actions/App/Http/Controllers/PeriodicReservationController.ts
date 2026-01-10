import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PeriodicReservationController::index
* @see app/Http/Controllers/PeriodicReservationController.php:0
* @route '/admin/periodicReservations'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/periodicReservations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PeriodicReservationController::index
* @see app/Http/Controllers/PeriodicReservationController.php:0
* @route '/admin/periodicReservations'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PeriodicReservationController::index
* @see app/Http/Controllers/PeriodicReservationController.php:0
* @route '/admin/periodicReservations'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PeriodicReservationController::index
* @see app/Http/Controllers/PeriodicReservationController.php:0
* @route '/admin/periodicReservations'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PeriodicReservationController::index
* @see app/Http/Controllers/PeriodicReservationController.php:0
* @route '/admin/periodicReservations'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PeriodicReservationController::index
* @see app/Http/Controllers/PeriodicReservationController.php:0
* @route '/admin/periodicReservations'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PeriodicReservationController::index
* @see app/Http/Controllers/PeriodicReservationController.php:0
* @route '/admin/periodicReservations'
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
* @see \App\Http\Controllers\PeriodicReservationController::create
* @see app/Http/Controllers/PeriodicReservationController.php:19
* @route '/admin/periodicReservations/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/periodicReservations/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PeriodicReservationController::create
* @see app/Http/Controllers/PeriodicReservationController.php:19
* @route '/admin/periodicReservations/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PeriodicReservationController::create
* @see app/Http/Controllers/PeriodicReservationController.php:19
* @route '/admin/periodicReservations/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PeriodicReservationController::create
* @see app/Http/Controllers/PeriodicReservationController.php:19
* @route '/admin/periodicReservations/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PeriodicReservationController::create
* @see app/Http/Controllers/PeriodicReservationController.php:19
* @route '/admin/periodicReservations/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PeriodicReservationController::create
* @see app/Http/Controllers/PeriodicReservationController.php:19
* @route '/admin/periodicReservations/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PeriodicReservationController::create
* @see app/Http/Controllers/PeriodicReservationController.php:19
* @route '/admin/periodicReservations/create'
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
* @see \App\Http\Controllers\PeriodicReservationController::store
* @see app/Http/Controllers/PeriodicReservationController.php:33
* @route '/admin/periodicReservations'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/periodicReservations',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PeriodicReservationController::store
* @see app/Http/Controllers/PeriodicReservationController.php:33
* @route '/admin/periodicReservations'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PeriodicReservationController::store
* @see app/Http/Controllers/PeriodicReservationController.php:33
* @route '/admin/periodicReservations'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PeriodicReservationController::store
* @see app/Http/Controllers/PeriodicReservationController.php:33
* @route '/admin/periodicReservations'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PeriodicReservationController::store
* @see app/Http/Controllers/PeriodicReservationController.php:33
* @route '/admin/periodicReservations'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\PeriodicReservationController::show
* @see app/Http/Controllers/PeriodicReservationController.php:0
* @route '/admin/periodicReservations/{periodicReservation}'
*/
export const show = (args: { periodicReservation: string | number } | [periodicReservation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/periodicReservations/{periodicReservation}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PeriodicReservationController::show
* @see app/Http/Controllers/PeriodicReservationController.php:0
* @route '/admin/periodicReservations/{periodicReservation}'
*/
show.url = (args: { periodicReservation: string | number } | [periodicReservation: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { periodicReservation: args }
    }

    if (Array.isArray(args)) {
        args = {
            periodicReservation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        periodicReservation: args.periodicReservation,
    }

    return show.definition.url
            .replace('{periodicReservation}', parsedArgs.periodicReservation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PeriodicReservationController::show
* @see app/Http/Controllers/PeriodicReservationController.php:0
* @route '/admin/periodicReservations/{periodicReservation}'
*/
show.get = (args: { periodicReservation: string | number } | [periodicReservation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PeriodicReservationController::show
* @see app/Http/Controllers/PeriodicReservationController.php:0
* @route '/admin/periodicReservations/{periodicReservation}'
*/
show.head = (args: { periodicReservation: string | number } | [periodicReservation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PeriodicReservationController::show
* @see app/Http/Controllers/PeriodicReservationController.php:0
* @route '/admin/periodicReservations/{periodicReservation}'
*/
const showForm = (args: { periodicReservation: string | number } | [periodicReservation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PeriodicReservationController::show
* @see app/Http/Controllers/PeriodicReservationController.php:0
* @route '/admin/periodicReservations/{periodicReservation}'
*/
showForm.get = (args: { periodicReservation: string | number } | [periodicReservation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PeriodicReservationController::show
* @see app/Http/Controllers/PeriodicReservationController.php:0
* @route '/admin/periodicReservations/{periodicReservation}'
*/
showForm.head = (args: { periodicReservation: string | number } | [periodicReservation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\PeriodicReservationController::edit
* @see app/Http/Controllers/PeriodicReservationController.php:0
* @route '/admin/periodicReservations/{periodicReservation}/edit'
*/
export const edit = (args: { periodicReservation: string | number } | [periodicReservation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/periodicReservations/{periodicReservation}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PeriodicReservationController::edit
* @see app/Http/Controllers/PeriodicReservationController.php:0
* @route '/admin/periodicReservations/{periodicReservation}/edit'
*/
edit.url = (args: { periodicReservation: string | number } | [periodicReservation: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { periodicReservation: args }
    }

    if (Array.isArray(args)) {
        args = {
            periodicReservation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        periodicReservation: args.periodicReservation,
    }

    return edit.definition.url
            .replace('{periodicReservation}', parsedArgs.periodicReservation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PeriodicReservationController::edit
* @see app/Http/Controllers/PeriodicReservationController.php:0
* @route '/admin/periodicReservations/{periodicReservation}/edit'
*/
edit.get = (args: { periodicReservation: string | number } | [periodicReservation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PeriodicReservationController::edit
* @see app/Http/Controllers/PeriodicReservationController.php:0
* @route '/admin/periodicReservations/{periodicReservation}/edit'
*/
edit.head = (args: { periodicReservation: string | number } | [periodicReservation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PeriodicReservationController::edit
* @see app/Http/Controllers/PeriodicReservationController.php:0
* @route '/admin/periodicReservations/{periodicReservation}/edit'
*/
const editForm = (args: { periodicReservation: string | number } | [periodicReservation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PeriodicReservationController::edit
* @see app/Http/Controllers/PeriodicReservationController.php:0
* @route '/admin/periodicReservations/{periodicReservation}/edit'
*/
editForm.get = (args: { periodicReservation: string | number } | [periodicReservation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PeriodicReservationController::edit
* @see app/Http/Controllers/PeriodicReservationController.php:0
* @route '/admin/periodicReservations/{periodicReservation}/edit'
*/
editForm.head = (args: { periodicReservation: string | number } | [periodicReservation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\PeriodicReservationController::update
* @see app/Http/Controllers/PeriodicReservationController.php:0
* @route '/admin/periodicReservations/{periodicReservation}'
*/
export const update = (args: { periodicReservation: string | number } | [periodicReservation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/periodicReservations/{periodicReservation}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\PeriodicReservationController::update
* @see app/Http/Controllers/PeriodicReservationController.php:0
* @route '/admin/periodicReservations/{periodicReservation}'
*/
update.url = (args: { periodicReservation: string | number } | [periodicReservation: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { periodicReservation: args }
    }

    if (Array.isArray(args)) {
        args = {
            periodicReservation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        periodicReservation: args.periodicReservation,
    }

    return update.definition.url
            .replace('{periodicReservation}', parsedArgs.periodicReservation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PeriodicReservationController::update
* @see app/Http/Controllers/PeriodicReservationController.php:0
* @route '/admin/periodicReservations/{periodicReservation}'
*/
update.put = (args: { periodicReservation: string | number } | [periodicReservation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\PeriodicReservationController::update
* @see app/Http/Controllers/PeriodicReservationController.php:0
* @route '/admin/periodicReservations/{periodicReservation}'
*/
update.patch = (args: { periodicReservation: string | number } | [periodicReservation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\PeriodicReservationController::update
* @see app/Http/Controllers/PeriodicReservationController.php:0
* @route '/admin/periodicReservations/{periodicReservation}'
*/
const updateForm = (args: { periodicReservation: string | number } | [periodicReservation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PeriodicReservationController::update
* @see app/Http/Controllers/PeriodicReservationController.php:0
* @route '/admin/periodicReservations/{periodicReservation}'
*/
updateForm.put = (args: { periodicReservation: string | number } | [periodicReservation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PeriodicReservationController::update
* @see app/Http/Controllers/PeriodicReservationController.php:0
* @route '/admin/periodicReservations/{periodicReservation}'
*/
updateForm.patch = (args: { periodicReservation: string | number } | [periodicReservation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\PeriodicReservationController::destroy
* @see app/Http/Controllers/PeriodicReservationController.php:0
* @route '/admin/periodicReservations/{periodicReservation}'
*/
export const destroy = (args: { periodicReservation: string | number } | [periodicReservation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/periodicReservations/{periodicReservation}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\PeriodicReservationController::destroy
* @see app/Http/Controllers/PeriodicReservationController.php:0
* @route '/admin/periodicReservations/{periodicReservation}'
*/
destroy.url = (args: { periodicReservation: string | number } | [periodicReservation: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { periodicReservation: args }
    }

    if (Array.isArray(args)) {
        args = {
            periodicReservation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        periodicReservation: args.periodicReservation,
    }

    return destroy.definition.url
            .replace('{periodicReservation}', parsedArgs.periodicReservation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PeriodicReservationController::destroy
* @see app/Http/Controllers/PeriodicReservationController.php:0
* @route '/admin/periodicReservations/{periodicReservation}'
*/
destroy.delete = (args: { periodicReservation: string | number } | [periodicReservation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\PeriodicReservationController::destroy
* @see app/Http/Controllers/PeriodicReservationController.php:0
* @route '/admin/periodicReservations/{periodicReservation}'
*/
const destroyForm = (args: { periodicReservation: string | number } | [periodicReservation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PeriodicReservationController::destroy
* @see app/Http/Controllers/PeriodicReservationController.php:0
* @route '/admin/periodicReservations/{periodicReservation}'
*/
destroyForm.delete = (args: { periodicReservation: string | number } | [periodicReservation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const PeriodicReservationController = { index, create, store, show, edit, update, destroy }

export default PeriodicReservationController