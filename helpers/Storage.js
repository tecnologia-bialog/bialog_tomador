import React, { Component } from 'react'



export const SaveJsonAync = async (key, value ) =>  {

        let res = false;

         try {
              localStorage.setItem(key, JSON.stringify(value));
             res = true
        } catch (error) {
            console.warn('SaveAsyncStorage: '+error);
            res = false
        }

        return res

};

export const ReadJson = async (key) =>  {

        try {
              const value =  localStorage.getItem(key);
              if (value !== null){
                   return JSON.parse(value);
              }
        } catch (error) {
                console.warn('getItem:'+error);
        }

};


export const DeleteJson = (key) =>  {

        try {
          const value =  localStorage.removeItem(key);
        } catch (error) {
                console.warn('DeleteAsyncStorage:'+error);
        }

};

