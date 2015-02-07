

function table_keys(t, tabs) 
  tabs = tabs or 0

  for key, value in pairs(t) do
    print((' '):rep(tabs)..key .. ': ' .. type(t[key]))

    if (type(t[key]) == 'table') then
      table_keys(t[key], tabs + 1)
    end
  end
end

print('---\ntpt: ')
table_keys(tpt, 1)
print('\nelements: ')
table_keys(elements, 1)
print('\nsimulation: ')
table_keys(simulation, 1)
print('\nrenderer: ')
table_keys(renderer, 1)
print('\ngraphics: ')
table_keys(graphics, 1)
print('\nfileSystem: ')
table_keys(fileSystem, 1)
print('\ninterface: ')
table_keys(interface, 1)
print('\nbit: ')
table_keys(bit, 1)
print ('...')
