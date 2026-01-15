import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\VacationController::index
* @see app/Http/Controllers/Api/VacationController.php:14
* @route '/api/admin/vacations'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/admin/vacations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\VacationController::index
* @see app/Http/Controllers/Api/VacationController.php:14
* @route '/api/admin/vacations'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\VacationController::index
* @see app/Http/Controllers/Api/VacationController.php:14
* @route '/api/admin/vacations'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\VacationController::index
* @see app/Http/Controllers/Api/VacationController.php:14
* @route '/api/admin/vacations'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\VacationController::index
* @see app/Http/Controllers/Api/VacationController.php:14
* @route '/api/admin/vacations'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\VacationController::index
* @see app/Http/Controllers/Api/VacationController.php:14
* @route '/api/admin/vacations'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\VacationController::index
* @see app/Http/Controllers/Api/VacationController.php:14
* @route '/api/admin/vacations'
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
* @see \App\Http\Controllers\Api\VacationController::store
* @see app/Http/Controllers/Api/VacationController.php:0
* @route '/api/admin/vacations'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/admin/vacations',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\VacationController::store
* @see app/Http/Controllers/Api/VacationController.php:0
* @route '/api/admin/vacations'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\VacationController::store
* @see app/Http/Controllers/Api/VacationController.php:0
* @route '/api/admin/vacations'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\VacationController::store
* @see app/Http/Controllers/Api/VacationController.php:0
* @route '/api/admin/vacations'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\VacationController::store
* @see app/Http/Controllers/Api/VacationController.php:0
* @route '/api/admin/vacations'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Api\VacationController::show
* @see app/Http/Controllers/Api/VacationController.php:0
* @route '/api/admin/vacations/{vacation}'
*/
export const show = (args: { vacation: string | number } | [vacation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/admin/vacations/{vacation}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\VacationController::show
* @see app/Http/Controllers/Api/VacationController.php:0
* @route '/api/admin/vacations/{vacation}'
*/
show.url = (args: { vacation: string | number } | [vacation: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { vacation: args }
    }

    if (Array.isArray(args)) {
        args = {
            vacation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        vacation: args.vacation,
    }

    return show.definition.url
            .replace('{vacation}', parsedArgs.vacation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\VacationController::show
* @see app/Http/Controllers/Api/VacationController.php:0
* @route '/api/admin/vacations/{vacation}'
*/
show.get = (args: { vacation: string | number } | [vacation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\VacationController::show
* @see app/Http/Controllers/Api/VacationController.php:0
* @route '/api/admin/vacations/{vacation}'
*/
show.head = (args: { vacation: string | number } | [vacation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\VacationController::show
* @see app/Http/Controllers/Api/VacationController.php:0
* @route '/api/admin/vacations/{vacation}'
*/
const showForm = (args: { vacation: string | number } | [vacation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\VacationController::show
* @see app/Http/Controllers/Api/VacationController.php:0
* @route '/api/admin/vacations/{vacation}'
*/
showForm.get = (args: { vacation: string | number } | [vacation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\VacationController::show
* @see app/Http/Controllers/Api/VacationController.php:0
* @route '/api/admin/vacations/{vacation}'
*/
showForm.head = (args: { vacation: string | number } | [vacation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Api\VacationController::update
* @see app/Http/Controllers/Api/VacationController.php:0
* @route '/api/admin/vacations/{vacation}'
*/
export const update = (args: { vacation: string | number } | [vacation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/admin/vacations/{vacation}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Api\VacationController::update
* @see app/Http/Controllers/Api/VacationController.php:0
* @route '/api/admin/vacations/{vacation}'
*/
update.url = (args: { vacation: string | number } | [vacation: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { vacation: args }
    }

    if (Array.isArray(args)) {
        args = {
            vacation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        vacation: args.vacation,
    }

    return update.definition.url
            .replace('{vacation}', parsedArgs.vacation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\VacationController::update
* @see app/Http/Controllers/Api/VacationController.php:0
* @route '/api/admin/vacations/{vacation}'
*/
update.put = (args: { vacation: string | number } | [vacation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Api\VacationController::update
* @see app/Http/Controllers/Api/VacationController.php:0
* @route '/api/admin/vacations/{vacation}'
*/
update.patch = (args: { vacation: string | number } | [vacation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Api\VacationController::update
* @see app/Http/Controllers/Api/VacationController.php:0
* @route '/api/admin/vacations/{vacation}'
*/
const updateForm = (args: { vacation: string | number } | [vacation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\VacationController::update
* @see app/Http/Controllers/Api/VacationController.php:0
* @route '/api/admin/vacations/{vacation}'
*/
updateForm.put = (args: { vacation: string | number } | [vacation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\VacationController::update
* @see app/Http/Controllers/Api/VacationController.php:0
* @route '/api/admin/vacations/{vacation}'
*/
updateForm.patch = (args: { vacation: string | number } | [vacation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Api\VacationController::destroy
* @see app/Http/Controllers/Api/VacationController.php:0
* @route '/api/admin/vacations/{vacation}'
*/
export const destroy = (args: { vacation: string | number } | [vacation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/admin/vacations/{vacation}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\VacationController::destroy
* @see app/Http/Controllers/Api/VacationController.php:0
* @route '/api/admin/vacations/{vacation}'
*/
destroy.url = (args: { vacation: string | number } | [vacation: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { vacation: args }
    }

    if (Array.isArray(args)) {
        args = {
            vacation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        vacation: args.vacation,
    }

    return destroy.definition.url
            .replace('{vacation}', parsedArgs.vacation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\VacationController::destroy
* @see app/Http/Controllers/Api/VacationController.php:0
* @route '/api/admin/vacations/{vacation}'
*/
destroy.delete = (args: { vacation: string | number } | [vacation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Api\VacationController::destroy
* @see app/Http/Controllers/Api/VacationController.php:0
* @route '/api/admin/vacations/{vacation}'
*/
const destroyForm = (args: { vacation: string | number } | [vacation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\VacationController::destroy
* @see app/Http/Controllers/Api/VacationController.php:0
* @route '/api/admin/vacations/{vacation}'
*/
destroyForm.delete = (args: { vacation: string | number } | [vacation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const VacationController = { index, store, show, update, destroy }

export default VacationController