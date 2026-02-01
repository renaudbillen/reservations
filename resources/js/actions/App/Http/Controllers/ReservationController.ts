import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ReservationController::index
* @see app/Http/Controllers/ReservationController.php:24
* @route '/admin/reservations'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/reservations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReservationController::index
* @see app/Http/Controllers/ReservationController.php:24
* @route '/admin/reservations'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReservationController::index
* @see app/Http/Controllers/ReservationController.php:24
* @route '/admin/reservations'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ReservationController::index
* @see app/Http/Controllers/ReservationController.php:24
* @route '/admin/reservations'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ReservationController::index
* @see app/Http/Controllers/ReservationController.php:24
* @route '/admin/reservations'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ReservationController::index
* @see app/Http/Controllers/ReservationController.php:24
* @route '/admin/reservations'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ReservationController::index
* @see app/Http/Controllers/ReservationController.php:24
* @route '/admin/reservations'
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
* @see \App\Http\Controllers\ReservationController::create
* @see app/Http/Controllers/ReservationController.php:99
* @route '/admin/reservations/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/reservations/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReservationController::create
* @see app/Http/Controllers/ReservationController.php:99
* @route '/admin/reservations/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReservationController::create
* @see app/Http/Controllers/ReservationController.php:99
* @route '/admin/reservations/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ReservationController::create
* @see app/Http/Controllers/ReservationController.php:99
* @route '/admin/reservations/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ReservationController::create
* @see app/Http/Controllers/ReservationController.php:99
* @route '/admin/reservations/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ReservationController::create
* @see app/Http/Controllers/ReservationController.php:99
* @route '/admin/reservations/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ReservationController::create
* @see app/Http/Controllers/ReservationController.php:99
* @route '/admin/reservations/create'
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
* @see \App\Http\Controllers\ReservationController::store
* @see app/Http/Controllers/ReservationController.php:113
* @route '/admin/reservations'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/reservations',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ReservationController::store
* @see app/Http/Controllers/ReservationController.php:113
* @route '/admin/reservations'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReservationController::store
* @see app/Http/Controllers/ReservationController.php:113
* @route '/admin/reservations'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ReservationController::store
* @see app/Http/Controllers/ReservationController.php:113
* @route '/admin/reservations'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ReservationController::store
* @see app/Http/Controllers/ReservationController.php:113
* @route '/admin/reservations'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\ReservationController::show
* @see app/Http/Controllers/ReservationController.php:0
* @route '/admin/reservations/{reservation}'
*/
export const show = (args: { reservation: string | number } | [reservation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/reservations/{reservation}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReservationController::show
* @see app/Http/Controllers/ReservationController.php:0
* @route '/admin/reservations/{reservation}'
*/
show.url = (args: { reservation: string | number } | [reservation: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { reservation: args }
    }

    if (Array.isArray(args)) {
        args = {
            reservation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        reservation: args.reservation,
    }

    return show.definition.url
            .replace('{reservation}', parsedArgs.reservation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReservationController::show
* @see app/Http/Controllers/ReservationController.php:0
* @route '/admin/reservations/{reservation}'
*/
show.get = (args: { reservation: string | number } | [reservation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ReservationController::show
* @see app/Http/Controllers/ReservationController.php:0
* @route '/admin/reservations/{reservation}'
*/
show.head = (args: { reservation: string | number } | [reservation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ReservationController::show
* @see app/Http/Controllers/ReservationController.php:0
* @route '/admin/reservations/{reservation}'
*/
const showForm = (args: { reservation: string | number } | [reservation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ReservationController::show
* @see app/Http/Controllers/ReservationController.php:0
* @route '/admin/reservations/{reservation}'
*/
showForm.get = (args: { reservation: string | number } | [reservation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ReservationController::show
* @see app/Http/Controllers/ReservationController.php:0
* @route '/admin/reservations/{reservation}'
*/
showForm.head = (args: { reservation: string | number } | [reservation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\ReservationController::edit
* @see app/Http/Controllers/ReservationController.php:170
* @route '/admin/reservations/{reservation}/edit'
*/
export const edit = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/reservations/{reservation}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReservationController::edit
* @see app/Http/Controllers/ReservationController.php:170
* @route '/admin/reservations/{reservation}/edit'
*/
edit.url = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { reservation: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { reservation: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            reservation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        reservation: typeof args.reservation === 'object'
        ? args.reservation.id
        : args.reservation,
    }

    return edit.definition.url
            .replace('{reservation}', parsedArgs.reservation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReservationController::edit
* @see app/Http/Controllers/ReservationController.php:170
* @route '/admin/reservations/{reservation}/edit'
*/
edit.get = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ReservationController::edit
* @see app/Http/Controllers/ReservationController.php:170
* @route '/admin/reservations/{reservation}/edit'
*/
edit.head = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ReservationController::edit
* @see app/Http/Controllers/ReservationController.php:170
* @route '/admin/reservations/{reservation}/edit'
*/
const editForm = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ReservationController::edit
* @see app/Http/Controllers/ReservationController.php:170
* @route '/admin/reservations/{reservation}/edit'
*/
editForm.get = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ReservationController::edit
* @see app/Http/Controllers/ReservationController.php:170
* @route '/admin/reservations/{reservation}/edit'
*/
editForm.head = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\ReservationController::update
* @see app/Http/Controllers/ReservationController.php:185
* @route '/admin/reservations/{reservation}'
*/
export const update = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/reservations/{reservation}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\ReservationController::update
* @see app/Http/Controllers/ReservationController.php:185
* @route '/admin/reservations/{reservation}'
*/
update.url = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { reservation: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { reservation: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            reservation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        reservation: typeof args.reservation === 'object'
        ? args.reservation.id
        : args.reservation,
    }

    return update.definition.url
            .replace('{reservation}', parsedArgs.reservation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReservationController::update
* @see app/Http/Controllers/ReservationController.php:185
* @route '/admin/reservations/{reservation}'
*/
update.put = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\ReservationController::update
* @see app/Http/Controllers/ReservationController.php:185
* @route '/admin/reservations/{reservation}'
*/
update.patch = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\ReservationController::update
* @see app/Http/Controllers/ReservationController.php:185
* @route '/admin/reservations/{reservation}'
*/
const updateForm = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ReservationController::update
* @see app/Http/Controllers/ReservationController.php:185
* @route '/admin/reservations/{reservation}'
*/
updateForm.put = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ReservationController::update
* @see app/Http/Controllers/ReservationController.php:185
* @route '/admin/reservations/{reservation}'
*/
updateForm.patch = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\ReservationController::destroy
* @see app/Http/Controllers/ReservationController.php:212
* @route '/admin/reservations/{reservation}'
*/
export const destroy = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/reservations/{reservation}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ReservationController::destroy
* @see app/Http/Controllers/ReservationController.php:212
* @route '/admin/reservations/{reservation}'
*/
destroy.url = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { reservation: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { reservation: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            reservation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        reservation: typeof args.reservation === 'object'
        ? args.reservation.id
        : args.reservation,
    }

    return destroy.definition.url
            .replace('{reservation}', parsedArgs.reservation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReservationController::destroy
* @see app/Http/Controllers/ReservationController.php:212
* @route '/admin/reservations/{reservation}'
*/
destroy.delete = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\ReservationController::destroy
* @see app/Http/Controllers/ReservationController.php:212
* @route '/admin/reservations/{reservation}'
*/
const destroyForm = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ReservationController::destroy
* @see app/Http/Controllers/ReservationController.php:212
* @route '/admin/reservations/{reservation}'
*/
destroyForm.delete = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const ReservationController = { index, create, store, show, edit, update, destroy }

export default ReservationController