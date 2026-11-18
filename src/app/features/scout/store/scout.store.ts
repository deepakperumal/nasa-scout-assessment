import { computed, inject } from '@angular/core';
import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap, catchError, of } from 'rxjs';
import { ScoutService } from '../services/scout.service';
import { ScoutObject } from '../models/scout.model';

type ScoutState = {
  candidates: ScoutObject[];
  loading: boolean;
  error: string | null;
  selected: ScoutObject | null;
};

const initialState: ScoutState = {
  candidates: [],
  loading: false,
  error: null,
  selected: null
};

export const ScoutStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ candidates, selected }) => ({
    hasData: computed(() => candidates().length > 0),
    hazardScore: computed(() => {
      const c = selected();
      if (!c) return null;
      return c.neoScore + c.phaScore + c.ieoScore;
    })
  })),
  withMethods((store, service = inject(ScoutService)) => ({
    load: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap(() =>
          service.getCandidates().pipe(
            tap({
              next: (res) => patchState(store, { candidates: res.data ?? [], loading: false }),
              error: (err) =>
                patchState(store, {
                  loading: false,
                  error: err?.message || 'Failed to load data from Scout API'
                })
            }),
            catchError(() => of(null))
          )
        )
      )
    ),
    select(candidate: ScoutObject | null) {
      patchState(store, { selected: candidate });
    },
    refresh() {
      this.load();
    }
  }))
);
