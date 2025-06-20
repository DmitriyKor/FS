import { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { apiURL } from '../const';
import { AppLangContext } from '../context/AppLangContext';

import { setDisplayPosts, setDisplayPhotos } from '../store/settingsSlice';

export function Settings() {
    const { t } = useContext(AppLangContext);

    const displayPosts = useSelector((state) => state.settings.displayPosts)
    const displayPhotos = useSelector((state) => state.settings.displayPhotos)
    const dispatch = useDispatch();

    return (
        <>
            <h1>{t('Settings')}</h1>
            <form>
                <label>Display posts
                    <input type='checkbox' checked={displayPosts}
                        onChange={(e) => dispatch(setDisplayPosts(e.target.checked))}></input>
                </label>
                <label>Display photos
                    <input type='checkbox' checked={displayPhotos}
                        onChange={(e) => dispatch(setDisplayPhotos(e.target.checked))}></input>
                </label>
            </form >
        </>
    )
}